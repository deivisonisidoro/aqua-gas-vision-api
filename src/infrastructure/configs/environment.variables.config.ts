import * as dotenv from 'dotenv';

dotenv.config();

/**
 * A static configuration service to retrieve environment variables.
 *
 * This class loads environment variables and provides static properties to access them.
 * It ensures that necessary environment variables are available throughout the application.
 */
export class EnvironmentVariablesConfig {
  /**
   * The URL of the PostgreSQL database.
   * @type {string}
   */
  static readonly databaseUrl: string =
    EnvironmentVariablesConfig.getEnvVariable('DATABASE_URL');

  /**
   * The username for the PostgreSQL database.
   * @type {string}
   */
  static readonly postgresUser: string =
    EnvironmentVariablesConfig.getEnvVariable('POSTGRES_USER');

  /**
   * The password for the PostgreSQL database.
   * @type {string}
   */
  static readonly postgresPassword: string =
    EnvironmentVariablesConfig.getEnvVariable('POSTGRES_PASSWORD');

  /**
   * The name of the PostgreSQL database.
   * @type {string}
   */
  static readonly postgresDb: string =
    EnvironmentVariablesConfig.getEnvVariable('POSTGRES_DB');

  /**
   * The API key for the Gemini service.
   * @type {string}
   */
  static readonly geminiApiKey: string =
    EnvironmentVariablesConfig.getEnvVariable('GEMINI_API_KEY');

  /**
   * Retrieves the value of an environment variable.
   *
   * @param {string} key - The key of the environment variable to retrieve.
   * @returns {string} - The value of the environment variable.
   * @throws {Error} - Throws an error if the environment variable is not set.
   * @private
   */
  private static getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  }
}
