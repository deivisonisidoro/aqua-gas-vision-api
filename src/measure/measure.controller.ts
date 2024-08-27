import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { UploadMeasureDto } from './dto/upload-measure.dto';
import { ConfirmMeasurementDto } from './dto/confirm-measure.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('measures')
@Controller()
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post("upload")
  upload(@Body() uploadMeasureDto: UploadMeasureDto) {
    return this.measureService.upload(uploadMeasureDto);
  }

  @Get(':customer_code/list')
  findByCustomerCode(@Param('customer_code') customer_code: string) {
    return this.measureService.findByCustomerCode(customer_code);
  }

  @Patch("confirm")
  confirm(@Body() confirmMeasureDto: ConfirmMeasurementDto) {
    return this.measureService.confirm(confirmMeasureDto);
  }
}
