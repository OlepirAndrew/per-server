import { Test, TestingModule } from '@nestjs/testing';
import { PerformersController } from './performers.controller';

describe('PerformersController', () => {
  let controller: PerformersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformersController],
    }).compile();

    controller = module.get<PerformersController>(PerformersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
