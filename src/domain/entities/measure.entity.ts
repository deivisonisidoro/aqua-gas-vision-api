/**
 * Interface representing the structure of a Measure entity.
 */
export interface IMeasureEntity {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: 'WATER' | 'GAS';
    has_confirmed: boolean;
    image_url: string;
    customer_code: string;
    measure_value: number;
  }
  
  /**
   * Entity representing a Measure.
   * 
   * This class implements the IMeasureEntity interface and provides
   * getters and setters for each property. It is used to manage the
   * measurement data within the application.
   */
  export class MeasureEntity implements IMeasureEntity {
    private _measure_uuid: string;
    private _measure_datetime: Date;
    private _measure_type: 'WATER' | 'GAS';
    private _has_confirmed: boolean;
    private _image_url: string;
    private _customer_code: string;
    private _measure_value: number;
  
    /**
     * Constructs a new MeasureEntity instance.
     * 
     * @param {IMeasureEntity} props - The properties to initialize the MeasureEntity.
     */
    constructor(
        props: IMeasureEntity
    ) {
      this._measure_uuid = props.measure_uuid;
      this._measure_datetime = props.measure_datetime;
      this._measure_type = props.measure_type;
      this._has_confirmed = props.has_confirmed;
      this._image_url = props.image_url;
      this._customer_code = props.customer_code;
      this._measure_value = props.measure_value;
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
      this._measure_datetime = value;
    }
  
    /** @returns {'WATER' | 'GAS'} The type of measurement (e.g., WATER or GAS). */
    get measure_type(): 'WATER' | 'GAS' {
      return this._measure_type;
    }
  
    /** @param {'WATER' | 'GAS'} value - The type of measurement (e.g., WATER or GAS). */
    set measure_type(value: 'WATER' | 'GAS') {
      this._measure_type = value;
    }
  
    /** @returns {boolean} Indicates if the measurement has been confirmed. */
    get has_confirmed(): boolean {
      return this._has_confirmed;
    }
  
    /** @param {boolean} value - Indicates if the measurement has been confirmed. */
    set has_confirmed(value: boolean) {
      this._has_confirmed = value;
    }
  
    /** @returns {string} URL of the image representing the measurement. */
    get image_url(): string {
      return this._image_url;
    }
  
    /** @param {string} value - URL of the image representing the measurement. */
    set image_url(value: string) {
      this._image_url = value;
    }
  
    /** @returns {string} The unique code identifying the customer. */
    get customer_code(): string {
      return this._customer_code;
    }
  
    /** @param {string} value - The unique code identifying the customer. */
    set customer_code(value: string) {
      this._customer_code = value;
    }
  
    /** @returns {number} The value of the measurement. */
    get measure_value(): number {
      return this._measure_value;
    }
  
    /** @param {number} value - The value of the measurement. */
    set measure_value(value: number) {
      this._measure_value = value;
    }
  }
  