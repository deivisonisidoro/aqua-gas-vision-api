/**
 * Abstract class for Gemini API providers.
 *
 * This class defines the necessary method for any provider that wants
 * to implement the functionality of extracting a measurement value from a
 * base64-encoded image.
 */
export abstract class AbstractGeminiApiProvider {
  /**
   * Extracts the measurement value from a base64-encoded image.
   *
   * @param {string} imageBase64 - The base64-encoded image containing the meter reading.
   * @returns {Promise<number>} A promise that resolves with the numeric measurement value extracted from the image.
   * @throws {InternalServerErrorException} Thrown if the extraction of the measurement value fails.
   */
  abstract getMeasurementValue(imageBase64: string): Promise<number>;
}
