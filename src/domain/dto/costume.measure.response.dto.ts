import { ApiProperty } from '@nestjs/swagger';
import { MeasureResponseDto } from './measure.response.dto';

export class CustomerMeasuresResponseDto {
  @ApiProperty({
    description: 'The code of the customer.',
    type: String,
  })
  customer_code: string;

  @ApiProperty({
    description: 'The list of measurements associated with the customer.',
    type: [MeasureResponseDto],
  })
  measures: MeasureResponseDto[];
}
