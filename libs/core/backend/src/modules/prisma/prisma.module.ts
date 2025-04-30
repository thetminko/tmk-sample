import { Global, Module } from '@nestjs/common';
import { providers, exports } from './prisma.const.js';

@Global()
@Module({
  providers,
  exports
})
export class PrismaModule {}
