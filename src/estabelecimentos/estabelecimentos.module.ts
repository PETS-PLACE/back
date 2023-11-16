import { Module } from '@nestjs/common';
import { EstabControllersController } from './estab.controllers/estab.controllers.controller';
import { EstabProvider } from './estab.provider/estab.provider';

@Module({
  controllers: [EstabControllersController],
  providers: [EstabProvider]
})
export class EstabelecimentosModule {}
