import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

/**
 * DTO for confirming a measurement.
 */
export class ConfirmMeasurementDto {
  @ApiProperty({
    description: 'The unique identifier for the measurement.',
    type: String,
  })
  measure_uuid: string;

  @ApiProperty({
    description: 'The confirmed value of the measurement.',
    type: Number,
  })
  confirmed_value: number;

  @ApiPropertyOptional({
    description: 'Indicates whether the measurement has been confirmed.',
    type: Boolean,
  })
  @IsOptional()
  has_confirmed?: boolean;
}
