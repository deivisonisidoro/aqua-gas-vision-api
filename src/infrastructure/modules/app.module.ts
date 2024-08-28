import { Module } from '@nestjs/common';
import { MeasureModule } from './measure.module';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [MeasureModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
