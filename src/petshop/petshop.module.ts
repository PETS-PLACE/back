import { Module } from '@nestjs/common';
import { PetshopController } from './petshop.controller/petshop.controller';
import { PetshopService } from './petshop.service/petshop.service';
import { Petshop } from './entities/petshop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Petshop])],
  controllers: [PetshopController],
  providers: [PetshopService]
})
export class PetshopModule {
}
