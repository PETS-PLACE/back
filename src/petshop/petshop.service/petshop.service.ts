import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petshop } from '../entities/petshop.entity';
import { CreatePetshopDto } from '../dto/create-petshop.dto';


@Injectable()
export class PetshopService {

  constructor(
    @InjectRepository(Petshop)
    private petshopsRepositorio: Repository<Petshop>
  ){

  }

  async salvarDadosPetshop( createPetshopDto: CreatePetshopDto )
  {
    const createPetshop = this.petshopsRepositorio.create({
      nomeComercial: createPetshopDto.nomeComercial,
      cnpj:     createPetshopDto.cnpj,
      rua:      createPetshopDto.rua,
      numero:   createPetshopDto.numero,
      bairro:   createPetshopDto.bairro,
      cidade:   createPetshopDto.cidade,
      estado:   createPetshopDto.estado,
      contatos: createPetshopDto.contatos,
      password: createPetshopDto.password,
    });
    return createPetshop;
  }

}
