import { Injectable } from '@nestjs/common';
import { UploadMeasureDto } from './dto/upload-measure.dto';
import { ConfirmMeasurementDto } from './dto/confirm-measure.dto';
import { MeasureRepository } from './measure.repository';

@Injectable()
export class MeasureService {

  constructor(private readonly measureRepository: MeasureRepository) {}

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
