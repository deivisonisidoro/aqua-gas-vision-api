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
@Controller('measures')
export class MeasureController {
  constructor(private readonly measureService: AbstractMeasureService) {}

  /**
   * Handles the upload of a new measurement record.
   *
   * @param {UploadMeasureDto} uploadMeasureDto - The data transfer object containing the measurement details to be uploaded.
   * @returns {Promise<any>} A promise that resolves to the result of the upload operation.
   */
  @Post('upload')
  upload(@Body() uploadMeasureDto: UploadMeasureDto) {
    return this.measureService.upload(uploadMeasureDto);
  }

  /**
   * Retrieves measurements for a specific customer, optionally filtered by parameters.
   *
   * @param {string} customer_code - The code of the customer whose measurements are to be retrieved.
   * @param {MeasureParametersDto} [measureParametersDto] - Optional parameters to filter the results.
   * @returns {Promise<any>} A promise that resolves to the measurements of the specified customer.
   */
  @Get(':customer_code/list')
  find(
    @Param('customer_code') customer_code: string,
    @Query() measureParametersDto?: MeasureParametersDto,
  ) {
    return this.measureService.find(customer_code, measureParametersDto);
  }

  /**
   * Confirms a measurement record based on the provided details.
   *
   * @param {ConfirmMeasurementDto} confirmMeasureDto - The data transfer object containing the confirmation details.
   * @returns {Promise<any>} A promise that resolves to the result of the confirmation operation.
   */
  @Patch('confirm')
  confirm(@Body() confirmMeasureDto: ConfirmMeasurementDto) {
    return this.measureService.confirm(confirmMeasureDto);
  }
}
