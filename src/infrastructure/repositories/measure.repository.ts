import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UploadMeasureDto } from '../../domain/dto/upload-measure.dto';
import { AbstractMeasureRepository } from '../../domain/repositories/abstract.measure.repository';
import { MeasureParametersDto } from 'src/domain/dto/params.measure.dto';
import { MeasureResponseDto } from 'src/domain/dto/measure.response.dto';
import { ConfirmMeasurementDto } from 'src/domain/dto/confirm-measure.dto';
import { Measure } from '@prisma/client';

@Injectable()
export class MeasureRepository extends AbstractMeasureRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  /**
   * Creates a new measurement record in the database.
   *
   * @param {UploadMeasureDto} data - The data transfer object containing the measurement details.
   * @returns {Promise<MeasureResponseDto>} A promise that resolves to the newly created measurement.
   */
  async create(data: UploadMeasureDto): Promise<MeasureResponseDto> {
    return this.prisma.measure.create({
      data: {
        measure_type: data.measure_type,
        customer_code: data.customer_code,
        image_url: data.image,
        measure_value: data.measure_value,
        measure_datetime: data.measure_datetime,
      },
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
  }

  /**
   * Finds measurements by type and date.
   *
   * @param {string} [measure_type] - The type of measurement to search for.
   * @param {Date} [measure_datetime] - The date of the measurement to search for.
   * @returns {Promise<MeasureResponseDto[]>} A promise that resolves to an array of measurements matching the criteria.
   */
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

  /**
   * Retrieves all measurement records from the database.
   *
   * @returns {Promise<MeasureResponseDto[]>} A promise that resolves to an array of all measurements.
   */
  async findAll(): Promise<MeasureResponseDto[]> {
    return this.prisma.measure.findMany();
  }

  /**
   * Finds a single measurement by its UUID.
   *
   * @param {string} measure_uuid - The UUID of the measurement to find.
   * @returns {Promise<Measure | null>} A promise that resolves to the measurement, or null if not found.
   */
  async findOne(measure_uuid: string): Promise<Measure | null> {
    return this.prisma.measure.findUnique({
      where: { measure_uuid },
    });
  }

  /**
   * Finds measurements by customer code.
   *
   * @param {string} customer_code - The customer code to search for.
   * @returns {Promise<MeasureResponseDto[] | null>} A promise that resolves to an array of measurements, or null if not found.
   */
  async findByCustomerCode(
    customer_code: string,
  ): Promise<MeasureResponseDto[] | null> {
    return this.prisma.measure.findMany({
      where: { customer_code },
    });
  }

  /**
   * Finds measurements based on customer code and additional parameters.
   *
   * @param {string} customer_code - The customer code to search for.
   * @param {MeasureParametersDto} [measureParametersDto] - Additional parameters for filtering the results.
   * @returns {Promise<MeasureResponseDto[]>} A promise that resolves to an array of measurements.
   */
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

  /**
   * Updates a measurement record in the database.
   *
   * @param {string} measure_uuid - The UUID of the measurement to update.
   * @param {Partial<ConfirmMeasurementDto>} data - The data to update the measurement with.
   * @returns {Promise<MeasureResponseDto>} A promise that resolves to the updated measurement.
   */
  async update(
    measure_uuid: string,
    data: Partial<ConfirmMeasurementDto>,
  ): Promise<MeasureResponseDto> {
    return this.prisma.measure.update({
      where: { measure_uuid },
      data: {
        measure_value: data.confirmed_value,
        has_confirmed: data.has_confirmed,
      },
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
  }
}
