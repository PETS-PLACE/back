import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetshopController } from './petshop.controller/petshop.controller';
import { PetshopService } from './petshop.service/petshop.service';
import { Petshop } from './entities/petshop.entity';
import { ChecarPetshopsPipe } from './pipes/checar-petshops.pipe';

@Module({
  imports:[TypeOrmModule.forFeature([Petshop])],
  controllers: [PetshopController],
  providers: [
    PetshopService,
    ChecarPetshopsPipe
  ]
})
export class PetshopModule {
}
