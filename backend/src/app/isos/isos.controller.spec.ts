import { Test, TestingModule } from '@nestjs/testing';
import { IsosController } from './isos.controller';

describe('IsosController', () => {
  let controller: IsosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsosController],
    }).compile();

    controller = module.get<IsosController>(IsosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
