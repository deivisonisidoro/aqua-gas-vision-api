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
import { MeasureQueryDto } from '../domain/dto/query.measure.dto';

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
    @Query() measureQueryDto?: MeasureQueryDto,
  ) {
    return this.measureService.find(customer_code, measureQueryDto);
  }

  @Patch('confirm')
  confirm(@Body() confirmMeasureDto: ConfirmMeasurementDto) {
    return this.measureService.confirm(confirmMeasureDto);
  }
}
