import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UploadMeasureDto } from '../domain/dto/upload-measure.dto';
import { ConfirmMeasurementDto } from '../domain/dto/confirm-measure.dto';
import { AbstractMeasureService } from '../domain/services/abstract.measure.service';

@ApiTags('measures')
@Controller()
export class MeasureController {
  constructor(private readonly measureService: AbstractMeasureService) {}

  @Post('upload')
  upload(@Body() uploadMeasureDto: UploadMeasureDto) {
    return this.measureService.upload(uploadMeasureDto);
  }

  @Get(':customer_code/list')
  findByCustomerCode(@Param('customer_code') customer_code: string) {
    return this.measureService.findByCustomerCode(customer_code);
  }

  @Patch('confirm')
  confirm(@Body() confirmMeasureDto: ConfirmMeasurementDto) {
    return this.measureService.confirm(confirmMeasureDto);
  }
}
