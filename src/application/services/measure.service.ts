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

@Injectable()
export class MeasureService extends AbstractMeasureService {
  constructor(protected readonly measureRepository: AbstractMeasureRepository) {
    super();
  }

  async upload(uploadMeasureDto: UploadMeasureDto) {
    const measures = await this.measureRepository.findByTypeAndDate(
      uploadMeasureDto.measure_type,
      new Date(uploadMeasureDto.measure_datetime),
    );
    if (measures.length !== 0) {
      throw new ConflictException(
        ErrorMessagesMessageEnum.CONFIRMATION_DUPLICATE,
        'DOUBLE_REPORT',
      );
    }
    return this.measureRepository.create(uploadMeasureDto);
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
    await this.measureRepository.update(confirmMeasurementDto.measure_uuid, {
      has_confirmed: true,
      measure_value: confirmMeasurementDto.confirmed_value,
    });
    return {
      success: true,
    };
  }
}
