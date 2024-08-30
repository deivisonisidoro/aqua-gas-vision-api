import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Measure } from '@prisma/client';
import { UploadMeasureDto } from '../../domain/dto/upload-measure.dto';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';
import { MeasureParametersDto } from 'src/domain/dto/params.measure.dto';
import { MeasureResponseDto } from 'src/domain/dto/measure.response.dto';

@Injectable()
export class MeasureRepository extends AbstractMeasureRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: UploadMeasureDto): Promise<Measure> {
    return this.prisma.measure.create({
      data: {
        measure_type: data.measure_type,
        customer_code: data.customer_code,
        image_url: data.image,
        measure_value: data.measure_value,
        measure_datetime: data.measure_datetime,
      },
    });
  }

  async findByTypeAndDate(
    measure_type?: string,
    measure_datetime?: Date,
  ): Promise<MeasureResponseDto[]> {
    const whereClause: any = {};

    if (measure_type) {
      whereClause.measure_type = measure_type;
    }

    if (measure_datetime) {
      const startOfMonth = new Date(
        measure_datetime.getFullYear(),
        measure_datetime.getMonth(),
        1,
      );
      const endOfMonth = new Date(
        measure_datetime.getFullYear(),
        measure_datetime.getMonth() + 1,
        0,
      );

      whereClause.measure_datetime = {
        gte: startOfMonth,
        lte: endOfMonth,
      };
    }

    const measures = await this.prisma.measure.findMany({
      where: whereClause,
      select: {
        measure_uuid: true,
        measure_datetime: true,
        measure_type: true,
        has_confirmed: true,
        image_url: true,
      },
    });

    return measures;
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
  async find(
    customer_code: string,
    measureParametersDto?: MeasureParametersDto,
  ): Promise<MeasureResponseDto[]> {
    const measures = await this.prisma.measure.findMany({
      where: { customer_code, ...measureParametersDto },
      select: {
        measure_value: false,
        customer_code: false,
        measure_uuid: true,
        measure_datetime: true,
        measure_type: true,
        has_confirmed: true,
        image_url: true,
      },
    });
    return measures;
  }
  async update(measure_uuid: string, data: Partial<Measure>): Promise<Measure> {
    return this.prisma.measure.update({
      where: { measure_uuid },
      data,
    });
  }
}
