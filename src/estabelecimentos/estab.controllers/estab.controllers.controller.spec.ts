import { Test, TestingModule } from '@nestjs/testing';
import { EstabControllersController } from './estab.controllers.controller';

describe('EstabControllersController', () => {
  let controller: EstabControllersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabControllersController],
    }).compile();

    controller = module.get<EstabControllersController>(EstabControllersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
