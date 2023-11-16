import { Test, TestingModule } from '@nestjs/testing';
import { EstabProvider } from './estab.provider';

describe('EstabProvider', () => {
  let provider: EstabProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstabProvider],
    }).compile();

    provider = module.get<EstabProvider>(EstabProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
