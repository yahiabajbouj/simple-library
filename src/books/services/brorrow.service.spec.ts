import { Test, TestingModule } from '@nestjs/testing';
import { BrorrowService } from './brorrow.service';

describe('BrorrowService', () => {
  let service: BrorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrorrowService],
    }).compile();

    service = module.get<BrorrowService>(BrorrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
