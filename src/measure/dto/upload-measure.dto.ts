import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, Matches, IsOptional, IsInt, Min } from 'class-validator';

/**
 * DTO for uploading a measurement.
 */
export class UploadMeasureDto {
  @ApiProperty({
    description: 'The base64 encoded image representing the measurement.',
    type: String,
  })
  @IsString({ message: 'image must be a string' })
  @Matches(/^data:image\/[a-zA-Z]+;base64,/i, { message: 'image must be a valid base64-encoded image string' })
  image: string;

  @ApiProperty({
    description: 'The unique code identifying the customer.',
    type: String,
  })
  @IsString({ message: 'customer_code must be a string' })
  customer_code: string;

  @ApiProperty({
    description: 'The date and time when the measurement was taken.',
    type: String,
    format: 'date-time',
  })
  @IsDateString({}, { message: 'measure_datetime must be a valid ISO 8601 date string' })
  measure_datetime: Date;

  @ApiProperty({
    description: "The type of measurement, either 'WATER' or 'GAS'.",
    enum: ['WATER', 'GAS'],
  })
  @IsEnum(['WATER', 'GAS'], { message: "measure_type must be either 'WATER' or 'GAS'" })
  measure_type: 'WATER' | 'GAS';

  @ApiPropertyOptional({
    description: 'The value of the measurement.',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'measure_value must be an integer' })
  @Min(0, { message: 'measure_value must be a positive integer' })
  measure_value?: number;
}
