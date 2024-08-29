import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsDateString,
  Matches,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ErrorMessagesMessageEnum } from '../enums/error.messages/message.enum';

/**
 * DTO for uploading a measurement.
 */
export class UploadMeasureDto {
  @ApiProperty({
    description: 'The base64 encoded image representing the measurement.',
    type: String,
  })
  @IsString({ message: ErrorMessagesMessageEnum.INVALID_IMAGE_URL })
  @Matches(/^data:image\/[a-zA-Z]+;base64,/i, {
    message: ErrorMessagesMessageEnum.INVALID_IMAGE_URL,
  })
  image: string;

  @ApiProperty({
    description: 'The unique code identifying the customer.',
    type: String,
  })
  @IsString({ message: ErrorMessagesMessageEnum.INVALID_CUSTOMER_CODE })
  customer_code: string;

  @ApiProperty({
    description: 'The date and time when the measurement was taken.',
    type: String,
    format: 'date-time',
  })
  @IsDateString(
    {},
    { message: ErrorMessagesMessageEnum.INVALID_MEASURE_DATETIME },
  )
  measure_datetime: Date;

  @ApiProperty({
    description: "The type of measurement, either 'WATER' or 'GAS'.",
    enum: ['WATER', 'GAS'],
  })
  @IsEnum(['WATER', 'GAS'], {
    message: ErrorMessagesMessageEnum.INVALID_MEASURE_TYPE,
  })
  measure_type: string;

  @ApiPropertyOptional({
    description: 'The value of the measurement.',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: ErrorMessagesMessageEnum.INVALID_MEASURE_VALUE })
  @Min(0, { message: ErrorMessagesMessageEnum.INVALID_MEASURE_VALUE })
  measure_value?: number;
}
