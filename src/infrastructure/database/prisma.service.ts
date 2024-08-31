import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EnvironmentVariablesConfig } from '../configs/environment.variables.config';

/**
 * PrismaService is a service class that extends PrismaClient to manage database connections.
 * It implements the OnModuleInit and OnModuleDestroy interfaces to handle connection lifecycle events.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Constructs the PrismaService instance and initializes the PrismaClient with the database URL.
   */
  constructor() {
    super({
      datasources: {
        db: {
          url: EnvironmentVariablesConfig.databaseUrl,
        },
      },
    });
  }

  /**
   * This method is called when the module is initialized.
   * It establishes a connection to the Prisma Client.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * This method is called when the module is destroyed.
   * It disconnects the Prisma Client to clean up resources.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is closed.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
