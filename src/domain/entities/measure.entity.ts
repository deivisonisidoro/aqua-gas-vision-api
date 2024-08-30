import { BadRequestException } from '@nestjs/common';
import { MeasureEntityType } from './@types/measure.entity.type';
import { ErrorMessagesMessageEnum } from '../enums/error.messages/message.enum';

/**
 * Entity representing a Measure.
 *
 * This class implements the MeasureEntityType interface and provides
 * getters and setters for each property. It is used to manage the
 * measurement data within the application.
 */
export class MeasureEntity implements MeasureEntityType {
  private _measure_uuid?: string;
  private _measure_datetime: Date;
  private _measure_type: string;
  private _has_confirmed: boolean;
  private _image_url: string;
  private _customer_code: string;
  private _measure_value: number;

  /**
   * Constructs a new MeasureEntity instance.
   *
   * @param {MeasureEntityType} props - The properties to initialize the MeasureEntity.
   */
  constructor(props: MeasureEntityType) {
    this.measure_uuid = props.measure_uuid;
    this.measure_datetime = props.measure_datetime;
    this.measure_type = props.measure_type;
    this.has_confirmed = props.has_confirmed;
    this.image_url = props.image_url;
    this.customer_code = props.customer_code;
    this.measure_value = props.measure_value;
  }

  /** @returns {string} The unique identifier for the measure. */
  get measure_uuid(): string {
    return this._measure_uuid;
  }

  /** @param {string} value - The unique identifier for the measure. */
  set measure_uuid(value: string) {
    this._measure_uuid = value;
  }

  /** @returns {Date} The date and time when the measurement was taken. */
  get measure_datetime(): Date {
    return this._measure_datetime;
  }

  /** @param {Date} value - The date and time when the measurement was taken. */
  set measure_datetime(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new BadRequestException(
        ErrorMessagesMessageEnum.INVALID_DATETIME,
        'INVALID_DATA',
      );
    }
    this._measure_datetime = value;
  }

  /** @returns {string} The type of measurement (e.g., WATER or GAS). */
  get measure_type(): string {
    return this._measure_type;
  }

  /** @param {string} value - The type of measurement (e.g., WATER or GAS). */
  set measure_type(value: string) {
    if (value !== 'WATER' && value !== 'GAS') {
      throw new BadRequestException(
        ErrorMessagesMessageEnum.INVALID_MEASURE_TYPE,
        'INVALID_DATA',
      );
    }
    this._measure_type = value;
  }

  /** @returns {boolean} Indicates if the measurement has been confirmed. */
  get has_confirmed(): boolean {
    return this._has_confirmed;
  }

  /** @param {boolean} value - Indicates if the measurement has been confirmed. */
  set has_confirmed(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new BadRequestException(
        ErrorMessagesMessageEnum.INVALID_CONFIRMATION_STATUS,
        'INVALID_DATA',
      );
    }
    this._has_confirmed = value;
  }

  /** @returns {string} URL of the image representing the measurement. */
  get image_url(): string {
    return this._image_url;
  }

  /** @param {string} value - URL of the image representing the measurement. */
  set image_url(value: string) {
    const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/i;
    if (!base64Pattern.test(value)) {
      throw new BadRequestException(
        ErrorMessagesMessageEnum.INVALID_IMAGE_URL,
        'INVALID_DATA',
      );
    }
    this._image_url = value;
  }

  /** @returns {string} The unique code identifying the customer. */
  get customer_code(): string {
    return this._customer_code;
  }

  /** @param {string} value - The unique code identifying the customer. */
  set customer_code(value: string) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new BadRequestException(
        ErrorMessagesMessageEnum.INVALID_CUSTOMER_CODE,
        'INVALID_DATA',
      );
    }
    this._customer_code = value;
  }

  /** @returns {number} The value of the measurement. */
  get measure_value(): number {
    return this._measure_value;
  }

  /** @param {number} value - The value of the measurement. */
  set measure_value(value: number) {
    if (value !== undefined) {
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        throw new BadRequestException(
          ErrorMessagesMessageEnum.INVALID_MEASURE_VALUE,
          'INVALID_DATA',
        );
      }
      if (value < 0) {
        throw new BadRequestException(
          ErrorMessagesMessageEnum.INVALID_MEASURE_VALUE,
          'INVALID_DATA',
        );
      }
    }
    this._measure_value = value;
  }
}
