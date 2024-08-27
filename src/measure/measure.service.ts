import { Injectable } from '@nestjs/common';
import { UploadMeasureDto } from './dto/upload-measure.dto';
import { ConfirmMeasurementDto } from './dto/confirm-measure.dto';

@Injectable()
export class MeasureService {
  upload(uploadMeasureDto: UploadMeasureDto) {
    return 'This action adds a new measure';
  }

  findByCustomerCode(customer_code: string) {
    return `This action returns a #${customer_code} measure`;
  }

  confirm(confirmMeasurementDto: ConfirmMeasurementDto) {
    return `This action updates a #${confirmMeasurementDto} measure`;
  }
}
