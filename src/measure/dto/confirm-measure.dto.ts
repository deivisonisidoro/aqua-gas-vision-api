import { ApiProperty } from '@nestjs/swagger';

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
}
