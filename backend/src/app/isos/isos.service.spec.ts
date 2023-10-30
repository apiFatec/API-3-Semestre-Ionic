import { Test, TestingModule } from '@nestjs/testing';
import { IsosService } from './isos.service';

describe('IsosService', () => {
  let service: IsosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsosService],
    }).compile();

    service = module.get<IsosService>(IsosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
