import { Test, TestingModule } from '@nestjs/testing';
import { ContaProvider } from './conta.provider';

describe('ContaProvider', () => {
  let provider: ContaProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaProvider],
    }).compile();

    provider = module.get<ContaProvider>(ContaProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
