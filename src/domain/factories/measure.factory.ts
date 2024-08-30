import { MeasureEntityType } from '../entities/@types/measure.entity.type';
import { MeasureEntity } from '../entities/measure.entity';

/**
 * Factory class for creating MeasureEntity instances.
 */
export class MeasureFactory {
  /**
   * Creates a new MeasureEntity instance with the specified values.
   *
   * @param {MeasureEntityType} props - The properties to initialize the MeasureEntity.
   */
  static create(props: MeasureEntityType): MeasureEntity {
    const measureEntity = new MeasureEntity({
      measure_datetime: props.measure_datetime,
      measure_type: props.measure_type,
      image_url: props.image_url,
      customer_code: props.customer_code,
      has_confirmed: false,
    });
    measureEntity.measure_datetime = props.measure_datetime;
    measureEntity.measure_type = props.measure_type;
    measureEntity.image_url = props.image_url;
    measureEntity.customer_code = props.customer_code;
    measureEntity.has_confirmed = false;
    return measureEntity;
  }
}
