import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppController } from './base-app.controller.js';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();
  });

  describe('ping', () => {
    it('should return "pong"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.ping()).toEqual({ message: 'pong' });
    });
  });
});
