/**
 * Enum representing validation error messages in the application.
 *
 * This enum centralizes all validation error messages that are used
 * across the application. The error messages are provided
 * in Portuguese to match the application’s requirements.
 *
 * @enum {string}
 */
export enum ErrorMessagesMessageEnum {
  /**
   * Error message for an invalid measure type.
   * Valid values are 'WATER' or 'GAS'.
   */
  INVALID_MEASURE_TYPE = 'Tipo de medição não permitida',

  /**
   * Error message for an invalid measure datetime.
   * The datetime must be in ISO 8601 format.
   */
  INVALID_MEASURE_DATETIME = 'measure_datetime deve ser uma data válida no formato ISO 8601',

  /**
   * Error message for an invalid image URL.
   * The URL must be a valid base64-encoded string.
   */
  INVALID_IMAGE_URL = 'image deve ser uma string válida codificada em base64',

  /**
   * Error message for an invalid measure value.
   * The value must be a positive integer.
   */
  INVALID_MEASURE_VALUE = 'measure_value deve ser um número inteiro positivo',

  /**
   * Error message for an invalid measure UUID.
   * The UUID must be a valid version 4 UUID.
   */
  INVALID_MEASURE_UUID = 'measure_uuid deve ser um UUID válido versão 4',

  /**
   * Error message for an invalid confirmed value.
   * The confirmed value must be an integer.
   */
  INVALID_CONFIRMED_VALUE = 'confirmed_value deve ser um número inteiro',

  /**
   * Error message for an invalid customer code.
   * The customer code must be a string.
   */
  INVALID_CUSTOMER_CODE = 'customer_code deve ser uma string',

  /**
   * Error message for a confirmed value that is less than 0.
   */
  MIN_CONFIRMED_VALUE = 'confirmed_value deve ser no mínimo 0',

  /**
   * Error message for when a measure is not found.
   */
  MEASURE_NOT_FOUND = 'Nenhuma leitura encontrada',
}
