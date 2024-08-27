import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for uploading a measurement.
 */
export class UploadMeasureDto {
  @ApiProperty({
    description: 'The base64 encoded image representing the measurement.',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'The unique code identifying the customer.',
    type: String,
  })
  customer_code: string;

  @ApiProperty({
    description: 'The date and time when the measurement was taken.',
    type: String,
    format: 'date-time',
  })
  measure_datetime: Date;

  @ApiProperty({
    description: "The type of measurement, either 'WATER' or 'GAS'.",
    enum: ['WATER', 'GAS'],
  })
  measure_type: 'WATER' | 'GAS';
}
