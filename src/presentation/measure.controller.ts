import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UploadMeasureDto } from '../domain/dto/upload-measure.dto';
import { ConfirmMeasurementDto } from '../domain/dto/confirm-measure.dto';
import { AbstractMeasureService } from '../domain/services/abstract.measure.service';
import { MeasureParametersDto } from '../domain/dto/params.measure.dto';

@ApiTags('measures')
@Controller()
export class MeasureController {
  constructor(private readonly measureService: AbstractMeasureService) {}

  @Post('upload')
  upload(@Body() uploadMeasureDto: UploadMeasureDto) {
    return this.measureService.upload(uploadMeasureDto);
  }

  @Get(':customer_code/list')
  find(
    @Param('customer_code') customer_code: string,
    @Query() MeasureParametersDto?: MeasureParametersDto,
  ) {
    MeasureParametersDto = { customer_code, ...MeasureParametersDto };
    return this.measureService.find(MeasureParametersDto);
  }

  @Patch('confirm')
  confirm(@Body() confirmMeasureDto: ConfirmMeasurementDto) {
    return this.measureService.confirm(confirmMeasureDto);
  }
}
