import { Module } from '@nestjs/common';
import { MeasureModule } from './measure/measure.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [MeasureModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
