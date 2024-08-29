import { ApiProperty } from '@nestjs/swagger';

export class MeasureResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the measurement.',
    type: String,
  })
  measure_uuid: string;

  @ApiProperty({
    description: 'The datetime when the measurement was taken.',
    type: String,
    format: 'date-time',
  })
  measure_datetime: Date;

  @ApiProperty({
    description: 'The type of the measurement (e.g., WATER, GAS).',
    type: String,
  })
  measure_type: string;

  @ApiProperty({
    description: 'Indicates whether the measurement has been confirmed.',
    type: Boolean,
  })
  has_confirmed: boolean;

  @ApiProperty({
    description: 'The URL of the image associated with the measurement.',
    type: String,
  })
  image_url: string;
}
