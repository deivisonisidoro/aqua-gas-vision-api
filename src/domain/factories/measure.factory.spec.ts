import { MeasureFactory } from './measure.factory';
import { MeasureEntity } from '../entities/measure.entity';
import { MeasureEntityType } from '../entities/@types/measure.entity.type';

describe('MeasureFactory', () => {
  let measureProps: MeasureEntityType;

  beforeEach(() => {
    measureProps = {
      measure_uuid: '1234-5678-91011-1213',
      measure_datetime: new Date('2024-08-28T10:00:00Z'),
      measure_type: 'WATER',
      has_confirmed: true,
      image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      customer_code: 'CUSTOMER123',
      measure_value: 100,
    };
  });

  it('should create an instance of MeasureEntity using the factory', () => {
    const measureEntity = MeasureFactory.create(measureProps);

    expect(measureEntity).toBeInstanceOf(MeasureEntity);
    expect(measureEntity.measure_datetime).toBe(measureProps.measure_datetime);
    expect(measureEntity.measure_type).toBe(measureProps.measure_type);
    expect(measureEntity.image_url).toBe(measureProps.image_url);
    expect(measureEntity.customer_code).toBe(measureProps.customer_code);
  });

  it('should allow measure_uuid to be optional in MeasureEntity', () => {
    const measurePropsWithoutUUID = {
      ...measureProps,
      measure_uuid: undefined,
    };
    const measureEntity = MeasureFactory.create(measurePropsWithoutUUID);

    expect(measureEntity.measure_uuid).toBeUndefined();
    expect(measureEntity.measure_datetime).toBe(measureProps.measure_datetime);
    expect(measureEntity.measure_type).toBe(measureProps.measure_type);
    expect(measureEntity.image_url).toBe(measureProps.image_url);
    expect(measureEntity.customer_code).toBe(measureProps.customer_code);
  });
});
