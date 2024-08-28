import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureController } from './measure.controller';
import { MeasureRepository } from './measure.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, MeasureRepository, PrismaService],
})
export class MeasureModule {}
