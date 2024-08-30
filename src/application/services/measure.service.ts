import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadMeasureDto } from '../../domain/dto/upload-measure.dto';
import { ConfirmMeasurementDto } from '../../domain/dto/confirm-measure.dto';
import { AbstractMeasureService } from '../../domain/services/abstract.measure.service';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';
import { MeasureParametersDto } from '../../domain/dto/params.measure.dto';
import { ErrorMessagesMessageEnum } from '../../domain/enums/error.messages/message.enum';
import { AbstractGeminiApiProvider } from '../../domain/providers/abstract.gemini.api.provider';
import { MeasureFactory } from '../../domain/factories/measure.factory';

@Injectable()
export class MeasureService extends AbstractMeasureService {
  constructor(
    protected readonly measureRepository: AbstractMeasureRepository,
    protected readonly geminiApiProvider: AbstractGeminiApiProvider,
  ) {
    super();
  }

  async upload(uploadMeasureDto: UploadMeasureDto) {
    const measureEntity = MeasureFactory.create({
      customer_code: uploadMeasureDto.customer_code,
      image_url: uploadMeasureDto.image,
      measure_datetime: uploadMeasureDto.measure_datetime,
      measure_type: uploadMeasureDto.measure_type,
    });
    const measures = await this.measureRepository.findByTypeAndDate(
      measureEntity.measure_type,
      new Date(measureEntity.measure_datetime),
    );

    if (measures.length > 0) {
      throw new ConflictException(
        ErrorMessagesMessageEnum.CONFIRMATION_DUPLICATE,
        'DOUBLE_REPORT',
      );
    }
    const measure_value = await this.geminiApiProvider.getMeasurementValue(
      measureEntity.image_url,
    );
    return this.measureRepository.create({
      customer_code: measureEntity.customer_code,
      measure_datetime: measureEntity.measure_datetime,
      measure_type: measureEntity.measure_type,
      measure_value: measure_value,
      image: measureEntity.image_url,
    });
  }

  async find(
    customer_code: string,
    measureParametersDto: MeasureParametersDto,
  ) {
    const measures = await this.measureRepository.find(
      customer_code,
      measureParametersDto,
    );
    if (measures.length == 0) {
      throw new NotFoundException(
        ErrorMessagesMessageEnum.MEASURE_NOT_FOUND,
        'MEASURE_NOT_FOUND',
      );
    }

    return {
      customer_code: customer_code,
      measures,
    };
  }

  async confirm(confirmMeasurementDto: ConfirmMeasurementDto) {
    const measure = await this.measureRepository.findOne(
      confirmMeasurementDto.measure_uuid,
    );

    if (!measure) {
      throw new NotFoundException(
        ErrorMessagesMessageEnum.MEASURE_NOT_FOUND,
        'MEASURE_NOT_FOUND',
      );
    }
    if (measure.has_confirmed) {
      throw new ConflictException(
        ErrorMessagesMessageEnum.CONFIRMATION_DUPLICATE,
        'CONFIRMATION_DUPLICATE',
      );
    }
    confirmMeasurementDto.has_confirmed = true;
    await this.measureRepository.update(
      confirmMeasurementDto.measure_uuid,
      confirmMeasurementDto,
    );
    return {
      success: true,
    };
  }
}
