import { InternalServerErrorException } from '@nestjs/common';
import { AbstractGeminiApiProvider } from '../../domain/providers/abstract.gemini.api.provider';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EnvironmentVariablesConfig } from '../configs/environment.variables.config';

export class GeminiApiProvider extends AbstractGeminiApiProvider {
  /**
   * Retrieves the measurement value from a base64-encoded image.
   *
   * This method uses the Google Generative AI API to decode an image of a meter and extract the numeric
   * measurement value displayed on it. If the API response contains anything other than numbers, an error is thrown.
   *
   * @param {string} imageBase64 - The meter image encoded in base64.
   * @returns {Promise<number>} A promise resolved with the numeric measurement value.
   * @throws {InternalServerErrorException} If the API response contains non-numeric information or if any error occurs while analyzing the image.
   */
  async getMeasurementValue(imageBase64: string): Promise<number> {
    try {
      const genAI = new GoogleGenerativeAI(
        EnvironmentVariablesConfig.geminiApiKey,
      );
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        I am sending a base64-encoded image that contains the reading of a meter.
        Your task is to decode this image, extract the measurement value displayed on it, and return only that numeric value.

        Here is the encoded image: ${imageBase64}

        Please provide only the measurement value found in the image.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      const measurementValue = Number(responseText);
      if (isNaN(measurementValue)) {
        throw new InternalServerErrorException(
          'Gemini response contains non-numeric information',
        );
      }
      return measurementValue;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error analyzing the image');
    }
  }
}
