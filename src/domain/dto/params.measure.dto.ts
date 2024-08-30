import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorMessagesMessageEnum } from '../enums/error.messages/message.enum';

export class MeasureParametersDto {
  @ApiPropertyOptional({
    description: 'The unique code identifying the customer.',
  })
  @IsOptional()
  customer_code?: string;
  @ApiPropertyOptional({
    description: "The type of measurement, either 'WATER' or 'GAS'.",
    enum: ['WATER', 'GAS'],
  })
  @IsOptional()
  @IsEnum(['WATER', 'GAS'], {
    message: ErrorMessagesMessageEnum.INVALID_MEASURE_TYPE,
  })
  measure_type: string;
}
