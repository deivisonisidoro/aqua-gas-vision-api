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

  upload(uploadMeasureDto: UploadMeasureDto) {
    return this.measureRepository.create(uploadMeasureDto);
  }

  async find(MeasureParametersDto: MeasureParametersDto) {
    const measures = await this.measureRepository.find(MeasureParametersDto);
    if (measures.length == 0) {
      throw new NotFoundException(
        ErrorMessagesMessageEnum.MEASURE_NOT_FOUND,
        'MEASURE_NOT_FOUND',
      );
    }

    return {
      customer_code: MeasureParametersDto.customer_code,
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
