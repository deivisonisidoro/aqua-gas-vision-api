/**
 * Type representing the structure of a Measure entity.
 */
export type MeasureEntityType = {
  measure_uuid?: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed?: boolean;
  image_url: string;
  customer_code: string;
  measure_value?: number;
};
