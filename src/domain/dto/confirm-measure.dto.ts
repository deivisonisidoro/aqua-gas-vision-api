import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';
import { ErrorMessagesMessageEnum } from '../enums/error.messages/message.enum';

/**
 * DTO for confirming a measurement.
 */
export class ConfirmMeasurementDto {
  @ApiProperty({
    description: 'The unique identifier for the measurement.',
    type: String,
  })
  @IsUUID('4', { message: ErrorMessagesMessageEnum.INVALID_MEASURE_UUID })
  measure_uuid: string;

  @ApiProperty({
    description: 'The confirmed value of the measurement.',
    type: Number,
  })
  @IsInt({ message: ErrorMessagesMessageEnum.INVALID_CONFIRMED_VALUE })
  @Min(0, { message: ErrorMessagesMessageEnum.MIN_CONFIRMED_VALUE })
  confirmed_value: number;

  @ApiPropertyOptional({
    description: 'Indicates whether the measurement has been confirmed.',
    type: Boolean,
  })
  @IsOptional()
  has_confirmed?: boolean;
}
