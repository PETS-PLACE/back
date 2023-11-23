import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreatePetshopDto } from '../dto/create-petshop.dto';
import { ValidationPipe } from '@nestjs/common';
import { PetshopService } from '../petshop.service/petshop.service';

@Controller('petshop')
export class PetshopController {

  constructor(
    private petshopService: PetshopService
  ){}

  /** Armazena dados do cliente e retorna
   *  representação dos dados salvos.
   *  @param {CreatePetshopDto} createPetshopDto - dados para o pipe.
  * */
  @Post()
  async registrarPetshop(
    @Body(new ValidationPipe()) createPetshopDto: CreatePetshopDto
  ): Promise<CreatePetshopDto> {
    return this.petshopService.salvarDadosPetshop( createPetshopDto );
  }

}
