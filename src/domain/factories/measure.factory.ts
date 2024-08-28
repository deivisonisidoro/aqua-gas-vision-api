import { IMeasureEntity, MeasureEntity } from "../entities/measure.entity";

/**
 * Factory class for creating MeasureEntity instances.
 */
export class MeasureFactory {
  /**
   * Creates a new MeasureEntity instance with the specified values.
   * 
   * @param {IMeasureEntity} props - The properties to initialize the MeasureEntity.
   */
  static create(props: IMeasureEntity): MeasureEntity {
    return new MeasureEntity(props);
  }
}
