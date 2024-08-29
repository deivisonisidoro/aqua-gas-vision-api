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
    const measureEntity = new MeasureEntity({} as MeasureEntityType);

    measureEntity.measure_datetime = props.measure_datetime;
    measureEntity.measure_type = props.measure_type;
    measureEntity.has_confirmed = props.has_confirmed;
    measureEntity.image_url = props.image_url;
    measureEntity.customer_code = props.customer_code;
    measureEntity.measure_value = props.measure_value;

    return measureEntity;
  }
}
