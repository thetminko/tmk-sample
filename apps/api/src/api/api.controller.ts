import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('health')
  async ping(): Promise<string> {
    return 'API is healthy';
  }
}
