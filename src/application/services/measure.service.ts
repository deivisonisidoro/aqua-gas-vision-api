import { Injectable } from '@nestjs/common';
import { UploadMeasureDto } from '../../domain/dto/upload-measure.dto';
import { ConfirmMeasurementDto } from '../../domain/dto/confirm-measure.dto';
import { AbstractMeasureService } from '../../domain/services/abstract.measure.service';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';


@Injectable()
export class MeasureService extends AbstractMeasureService {

  constructor(protected readonly measureRepository: AbstractMeasureRepository) {
    super()
  }


  upload(uploadMeasureDto: UploadMeasureDto) {
    return this.measureRepository.create(uploadMeasureDto);
  }

  findByCustomerCode(customer_code: string) {
    return this.measureRepository.findByCustomerCode(customer_code);
  }

  confirm(confirmMeasurementDto: ConfirmMeasurementDto) {
    return  this.measureRepository.update(confirmMeasurementDto.measure_uuid, {
      has_confirmed: true,
      measure_value: confirmMeasurementDto.confirmed_value
    });
  }
}
