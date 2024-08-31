import { Module } from '@nestjs/common';
import { MeasureModule } from './measure.module';
import { PrismaService } from '../database/prisma.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [MeasureModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
