import { Test, TestingModule } from '@nestjs/testing';
import { ProcessesService } from './processes.service';

describe('ProcessesService', () => {
  let service: ProcessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessesService],
    }).compile();

    service = module.get<ProcessesService>(ProcessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> c0eb06f4ed8125fb042b779a92f8f05e1f8dbe85
