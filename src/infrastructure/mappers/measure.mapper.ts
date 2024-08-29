import { Measure } from '@prisma/client';
import { MeasureEntity } from 'src/domain/entities/measure.entity';
import { AbstractMapper } from 'src/domain/mapper/abastract.measure.mapper';

export class MeasureMapper extends AbstractMapper<Measure, MeasureEntity> {
  /**
   * Transforms a Measure model into a MeasureEntity.
   *
   * @param {Measure} model - The Measure model object from Prisma.
   * @returns {MeasureEntity} - The transformed MeasureEntity.
   */
  toEntity(model: Measure): MeasureEntity {
    return new MeasureEntity({
      measure_uuid: model.measure_uuid,
      measure_datetime: model.measure_datetime,
      measure_type: model.measure_type,
      has_confirmed: model.has_confirmed,
      image_url: model.image_url,
      customer_code: model.customer_code,
      measure_value: model.measure_value,
    });
  }
}
