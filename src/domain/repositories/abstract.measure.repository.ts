import { UploadMeasureDto } from '../dto/upload-measure.dto';
import { MeasureParametersDto } from '../dto/params.measure.dto';
import { MeasureResponseDto } from '../dto/measure.response.dto';
import { Measure } from '@prisma/client';

/**
 * Abstract class defining the core methods for measure repositories.
 */
export abstract class AbstractMeasureRepository {
  /**
   * Creates a new measurement.
   * @param data - Data transfer object for uploading a measurement.
   * @returns Promise of the created measurement.
   */
  abstract create(data: UploadMeasureDto): Promise<MeasureResponseDto>;

  /**
   * Finds all measurements.
   * @returns Promise of all measurements.
   */
  abstract findAll(): Promise<MeasureResponseDto[]>;

  /**
   * Finds a measurement by its unique identifier.
   * @param measure_uuid - The unique identifier for the measurement.
   * @returns Promise of the measurement or null if not found.
   */
  abstract findOne(measure_uuid: string): Promise<Measure | null>;

  /**
   * Finds measurements by customer code.
   * @param customer_code - The unique code identifying the customer.
   * @returns Promise of measurements associated with the given customer code or null if not found.
   */
  abstract findByCustomerCode(
    customer_code: string,
  ): Promise<MeasureResponseDto[] | null>;

  /**
   * Finds measurements by customer code.
   * @param customer_code - The unique code identifying the customer.
   * @param measure_type - The unique code identifying the customer.
   * @returns Promise of measurements associated with the given customer code or null if not found.
   */
  abstract find(
    customer_code: string,
    MeasureParametersDto?: MeasureParametersDto,
  ): Promise<MeasureResponseDto[]>;

  /**
   * Finds measurements by measure type and date.
   * @param measure_type - The type of measurement (e.g., 'WATER' or 'GAS').
   * @param measure_datetime - The date and time when the measurement was taken.
   * @returns Promise of measurements matching the type and date criteria.
   */
  abstract findByTypeAndDate(
    measure_type?: string,
    measure_datetime?: Date,
  ): Promise<MeasureResponseDto[]>;

  /**
   * Updates a measurement.
   * @param measure_uuid - The unique identifier for the measurement.
   * @param data - Partial data to update the measurement.
   * @returns Promise of the updated measurement.
   */
  abstract update(
    measure_uuid: string,
    data: Partial<MeasureResponseDto>,
  ): Promise<MeasureResponseDto>;
}
