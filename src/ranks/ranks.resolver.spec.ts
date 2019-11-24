import { Test, TestingModule } from '@nestjs/testing';
import { RanksResolver } from './ranks.resolver';

describe('RanksResolver', () => {
  let resolver: RanksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RanksResolver],
    }).compile();

    resolver = module.get<RanksResolver>(RanksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
