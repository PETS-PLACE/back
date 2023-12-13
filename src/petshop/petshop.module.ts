import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetshopController } from './petshop.controller';
import { PetshopService } from './petshop.service';
import { Petshop } from './entities/petshop.entity';
//import { Contatos } from './entities/contatos.entity';
import { ChecarPetshopsPipe } from './pipes/checar-petshops.pipe';

@Module({
  imports:[ TypeOrmModule.forFeature([Petshop]) ],
  controllers: [ PetshopController ],
  providers: [
    PetshopService,
    ChecarPetshopsPipe
  ],
  exports: [ PetshopService ]
})
export class PetshopModule {
}
