import { BadRequestException } from '@nestjs/common';
import { MeasureEntity } from './measure.entity';
import { MeasureEntityType } from './@types/measure.entity.type';

describe('MeasureEntity', () => {
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

  it('should create an instance of MeasureEntity', () => {
    const entity = new MeasureEntity(measureProps);
    expect(entity).toBeDefined();
    expect(entity.measure_uuid).toBe(measureProps.measure_uuid);
    expect(entity.measure_datetime).toBe(measureProps.measure_datetime);
    expect(entity.measure_type).toBe(measureProps.measure_type);
    expect(entity.has_confirmed).toBe(measureProps.has_confirmed);
    expect(entity.image_url).toBe(measureProps.image_url);
    expect(entity.customer_code).toBe(measureProps.customer_code);
    expect(entity.measure_value).toBe(measureProps.measure_value);
  });

  it('should throw an exception for invalid measure_type', () => {
    const entity = new MeasureEntity(measureProps);
    expect(() => {
      entity.measure_type = 'INVALID_TYPE';
    }).toThrow(BadRequestException);
  });

  it('should throw an exception for invalid image_url', () => {
    const entity = new MeasureEntity(measureProps);
    expect(() => {
      entity.image_url = 'invalid-url';
    }).toThrow(BadRequestException);
  });

  it('should throw an exception for non-integer measure_value', () => {
    const entity = new MeasureEntity(measureProps);
    expect(() => {
      entity.measure_value = 10.5;
    }).toThrow(BadRequestException);
  });

  it('should throw an exception for negative measure_value', () => {
    const entity = new MeasureEntity(measureProps);
    expect(() => {
      entity.measure_value = -1;
    }).toThrow(BadRequestException);
  });

  it('should allow measure_uuid to be set to undefined', () => {
    const entity = new MeasureEntity(measureProps);
    entity.measure_uuid = undefined;
    expect(entity.measure_uuid).toBeUndefined();
  });

  it('should allow optional measure_uuid in the constructor', () => {
    const optionalUuidProps = {
      ...measureProps,
      measure_uuid: undefined,
    };
    const entity = new MeasureEntity(optionalUuidProps);
    expect(entity.measure_uuid).toBeUndefined();
  });
});
