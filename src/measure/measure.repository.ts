import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Measure } from '@prisma/client';
import { UploadMeasureDto } from './dto/upload-measure.dto';

@Injectable()
export class MeasureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UploadMeasureDto): Promise<Measure> {
    return this.prisma.measure.create({
        data: {
            measure_type: data.measure_type,
            customer_code: data.customer_code,
            image_url: data.image,
            measure_value: data.measure_value
        }
    } );
  }

  async findAll(): Promise<Measure[]> {
    return this.prisma.measure.findMany();
  }

  async findOne(measure_uuid: string): Promise<Measure | null> {
    return this.prisma.measure.findUnique({
      where: { measure_uuid },
    });
  }
  async findByCustomerCode(customer_code: string): Promise<Measure[] | null> {
    return this.prisma.measure.findMany({
      where: { customer_code },
    });
  }
  async update(measure_uuid: string, data: Partial<Measure>): Promise<Measure> {
    return this.prisma.measure.update({
      where: { measure_uuid },
      data,
    });
  }
}
