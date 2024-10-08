import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Measure } from '@prisma/client';

import { MeasureService } from './measure.service';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';
import { AbstractGeminiApiProvider } from '../../domain/providers/abstract.gemini.api.provider';
import { UploadMeasureDto } from '../../domain/dto/upload-measure.dto';
import { ConfirmMeasurementDto } from '../../domain/dto/confirm-measure.dto';
import { MeasureParametersDto } from '../../domain/dto/params.measure.dto';
import { ErrorMessagesMessageEnum } from '../../domain/enums/error.messages/message.enum';
import { MeasureResponseDto } from '../../domain/dto/measure.response.dto';

describe('MeasureService', () => {
  let service: MeasureService;
  let measureRepository: AbstractMeasureRepository;
  let geminiApiProvider: AbstractGeminiApiProvider;
  const mockMeasureResponseDto: MeasureResponseDto = {
    has_confirmed: false,
    image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
    measure_datetime: new Date(),
    measure_type: 'WATER',
    measure_uuid: 'uuid fake',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasureService,
        {
          provide: AbstractMeasureRepository,
          useValue: {
            findByTypeAndDate: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: AbstractGeminiApiProvider,
          useValue: {
            getMeasurementValue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MeasureService>(MeasureService);
    measureRepository = module.get<AbstractMeasureRepository>(
      AbstractMeasureRepository,
    );
    geminiApiProvider = module.get<AbstractGeminiApiProvider>(
      AbstractGeminiApiProvider,
    );
  });

  describe('upload', () => {
    it('should throw a ConflictException if a measure already exists', async () => {
      const uploadMeasureDto: UploadMeasureDto = {
        measure_type: 'WATER',
        measure_datetime: new Date('2024-08-28T10:00:00Z'),
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
        measure_value: null,
        customer_code: 'CUSTOMER123',
      };

      jest
        .spyOn(measureRepository, 'findByTypeAndDate')
        .mockResolvedValue([mockMeasureResponseDto]);

      await expect(service.upload(uploadMeasureDto)).rejects.toThrow(
        new ConflictException(
          ErrorMessagesMessageEnum.CONFIRMATION_DUPLICATE,
          'DOUBLE_REPORT',
        ),
      );
    });

    it('should create a new measure if no existing measure is found', async () => {
      const uploadMeasureDto: UploadMeasureDto = {
        measure_type: 'WATER',
        measure_datetime: new Date('2024-08-28T10:00:00Z'),
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
        measure_value: null,
        customer_code: 'CUSTOMER123',
      };

      jest.spyOn(measureRepository, 'findByTypeAndDate').mockResolvedValue([]);
      jest
        .spyOn(geminiApiProvider, 'getMeasurementValue')
        .mockResolvedValue(123);
      jest
        .spyOn(measureRepository, 'create')
        .mockResolvedValue(mockMeasureResponseDto);

      await service.upload(uploadMeasureDto);

      expect(geminiApiProvider.getMeasurementValue).toHaveBeenCalledWith(
        uploadMeasureDto.image,
      );
      expect(measureRepository.create).toHaveBeenCalledWith({
        ...uploadMeasureDto,
        measure_value: 123,
      });
    });
  });

  describe('find', () => {
    it('should throw a NotFoundException if no measures are found', async () => {
      const measureParametersDto: MeasureParametersDto = {
        measure_type: 'GAS',
      };

      jest.spyOn(measureRepository, 'find').mockResolvedValue([]);

      await expect(
        service.find('customer_code', measureParametersDto),
      ).rejects.toThrow(
        new NotFoundException(
          ErrorMessagesMessageEnum.MEASURE_NOT_FOUND,
          'MEASURE_NOT_FOUND',
        ),
      );
    });

    it('should return measures if found', async () => {
      const measureParametersDto: MeasureParametersDto = {
        measure_type: 'WATER',
      };

      jest
        .spyOn(measureRepository, 'find')
        .mockResolvedValue([mockMeasureResponseDto]);

      const result = await service.find('customer_code', measureParametersDto);

      expect(result).toEqual({
        customer_code: 'customer_code',
        measures: [mockMeasureResponseDto],
      });
    });
  });

  describe('confirm', () => {
    it('should throw a NotFoundException if measure is not found', async () => {
      const confirmMeasurementDto: ConfirmMeasurementDto = {
        measure_uuid: 'uuid',
        confirmed_value: 123,
      };

      jest.spyOn(measureRepository, 'findOne').mockResolvedValue(null);

      await expect(service.confirm(confirmMeasurementDto)).rejects.toThrow(
        new NotFoundException(
          ErrorMessagesMessageEnum.MEASURE_NOT_FOUND,
          'MEASURE_NOT_FOUND',
        ),
      );
    });

    it('should throw a ConflictException if measure has already been confirmed', async () => {
      const confirmMeasurementDto: ConfirmMeasurementDto = {
        measure_uuid: 'uuid',
        confirmed_value: 123,
      };
      const measureModel: Measure = {
        ...mockMeasureResponseDto,
        measure_value: confirmMeasurementDto.confirmed_value,
        has_confirmed: true,
        customer_code: 'customer_test',
      };
      jest.spyOn(measureRepository, 'findOne').mockResolvedValue(measureModel);

      await expect(service.confirm(confirmMeasurementDto)).rejects.toThrow(
        new ConflictException(
          ErrorMessagesMessageEnum.CONFIRMATION_DUPLICATE,
          'CONFIRMATION_DUPLICATE',
        ),
      );
    });

    it('should confirm the measure if not already confirmed', async () => {
      const confirmMeasurementDto: ConfirmMeasurementDto = {
        measure_uuid: 'uuid',
        confirmed_value: 123,
      };
      const measureModel: Measure = {
        ...mockMeasureResponseDto,
        measure_value: confirmMeasurementDto.confirmed_value,
        has_confirmed: false,
        customer_code: 'customer_test',
      };

      jest.spyOn(measureRepository, 'findOne').mockResolvedValue(measureModel);
      jest
        .spyOn(measureRepository, 'update')
        .mockResolvedValue(mockMeasureResponseDto);

      const result = await service.confirm(confirmMeasurementDto);

      expect(result).toEqual({ success: true });
    });
  });
});
