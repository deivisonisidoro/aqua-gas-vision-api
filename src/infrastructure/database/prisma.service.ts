import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * This method is called when the module is initialized.
   * It establishes a connection to the Prisma Client.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * This method is called when the module is destroyed.
   * It disconnects the Prisma Client to clean up resources.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is closed.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
