import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

/**
 * DTO for confirming a measurement.
 */
export class ConfirmMeasurementDto {
  @ApiProperty({
    description: 'The unique identifier for the measurement.',
    type: String,
  })
  @IsUUID('4', { message: 'measure_uuid must be a valid UUID version 4' })
  measure_uuid: string;

  @ApiProperty({
    description: 'The confirmed value of the measurement.',
    type: Number,
  })
  @IsInt({ message: 'confirmed_value must be an integer' })
  @Min(0, { message: 'confirmed_value must be at least 0' })
  confirmed_value: number;
}
