import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [MeasureModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
