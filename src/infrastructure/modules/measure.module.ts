import { Module } from '@nestjs/common';
import { MeasureService } from '../../application/services/measure.service';
import { MeasureController } from '../../presentation/measure.controller';
import { MeasureRepository } from '../../infrastructure/repositories/measure.repository';
import { PrismaService } from '../database/prisma.service';
import { AbstractMeasureService } from '../../domain/services/abstract.measure.service';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';

@Module({
  controllers: [MeasureController],
  providers: [
    {
      provide: AbstractMeasureService,
      useClass: MeasureService,
    },
    {
      provide: AbstractMeasureRepository,
      useClass: MeasureRepository,
    },
    PrismaService,
  ],
})
export class MeasureModule {}
