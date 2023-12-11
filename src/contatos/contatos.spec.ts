import { Test, TestingModule } from '@nestjs/testing';
import { Contatos } from './contatos';

describe('Contatos', () => {
  let provider: Contatos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Contatos],
    }).compile();

    provider = module.get<Contatos>(Contatos);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
