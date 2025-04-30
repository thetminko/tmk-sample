import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect().catch((err: unknown) => {
      this.logger.error('PrismaClient connection error', err);
    });
  }
}
