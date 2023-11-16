import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  //Declarando serviço do repositório da entidade Client
  constructor(
    @InjectRepository(Client)
    private usersRepository: Repository<Client>
  ){}

  //O CreateClientDto é o objeto que contem os dados transferidos da requisição
  async create(createClientDto: CreateClientDto) {
    const createUser = this.usersRepository.create({
      nome: createClientDto.nome,
      cpf: createClientDto.cpf,
      rua: createClientDto.rua,
      numero: createClientDto.numero,
      bairro: createClientDto.bairro,
      cidade: createClientDto.cidade,
      estado: createClientDto.estado,
      email: createClientDto.email,
      password: createClientDto.password
    })

    return await this.usersRepository.save(createUser)
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    return this.usersRepository.findBy({id})
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.usersRepository.update(id, updateClientDto)

  }

  async remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
