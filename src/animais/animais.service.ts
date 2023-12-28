import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Animais } from './entity/animais.entity';
import { Client } from 'src/clients/entities/client.entity';

import { CreateAnimalDto } from 'src/animais/dto/create-animal-dto';
import { UpdateAnimalDto } from 'src/animais/dto/update-animal-dto';

@Injectable()
export class AnimaisService {
  constructor(
    @InjectRepository(Client) private clientsRepo: Repository<Client>,
    @InjectRepository(Animais) private animaisRepo: Repository<Animais>
  ) {}

  async novoRegistroAnimal( createAnimalDto: CreateAnimalDto ) {
    try {
      const animal = new Animais();
      const cliente = await this.clientsRepo.findOne({where:{nome:createAnimalDto.cliente}});

      animal.nome = createAnimalDto.nome;
      animal.especie =  createAnimalDto.especie;
      animal.idade =  createAnimalDto.idade;
      animal.peso =  createAnimalDto.peso;
      animal.cliente = cliente;

      return this.animaisRepo.save( animal );
    }
    catch(err) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'registro de animal para cliente falhou',
        detalhes: err
      });
    }
  }

  async todosRegistros( updateAnimalDto: UpdateAnimalDto )
  {
    try{
      const client = await this.clientsRepo.findOne({where:{nome:updateAnimalDto.cliente}});

      return await this.animaisRepo.createQueryBuilder('animais')
        .leftJoinAndSelect('client.animais', 'animais')
        .where('animais.cliente = :idClient', {idClient: client.id})
        .getMany();
    }
    catch(err) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'retorno de todos os registro de animais para um usuario falhou',
        detalhes: err
      });
    }
  }

  async atualizarRegistroAnimal( id: number, updateAnimalDto: UpdateAnimalDto ) {
    try {
      return await this.animaisRepo.update({id:id},{
        nome: updateAnimalDto.nome,
        especie: updateAnimalDto.especie,
        idade: updateAnimalDto.idade,
        peso: updateAnimalDto.peso,
      });
    }
    catch(err) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'atualização de dados do animal falhou',
        detalhes: err
      });
    }
  }

  async deleteRegistroAnimal( id: number ) {
    try {
      return await this.animaisRepo.delete( id );
    }
    catch(err)
    {
      throw new InternalServerErrorException({
        status: 500,
        message: 'atualização de dados do animal falhou',
        detalhes: err
      });
    }
  }

}
