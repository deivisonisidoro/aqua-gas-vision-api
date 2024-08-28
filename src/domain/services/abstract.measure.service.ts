import { ConfirmMeasurementDto } from "../dto/confirm-measure.dto";
import { UploadMeasureDto } from "../dto/upload-measure.dto";


/**
 * Abstract class defining the core methods for measure services.
 */
export abstract class AbstractMeasureService {

  /**
   * Uploads a new measurement.
   * @param uploadMeasureDto - Data transfer object for uploading a measurement.
   * @returns Promise of the created measurement.
   */
  abstract upload(uploadMeasureDto: UploadMeasureDto): Promise<any>;

  /**
   * Finds measurements by customer code.
   * @param customer_code - The unique code identifying the customer.
   * @returns Promise of measurements associated with the given customer code.
   */
  abstract findByCustomerCode(customer_code: string): Promise<any>;

  /**
   * Confirms a measurement.
   * @param confirmMeasurementDto - Data transfer object for confirming a measurement.
   * @returns Promise of the updated measurement.
   */
  abstract confirm(confirmMeasurementDto: ConfirmMeasurementDto): Promise<any>;
}
