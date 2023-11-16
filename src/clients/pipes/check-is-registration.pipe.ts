import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Criando pipe de validação personalizado que faz a verificação se o name já foi cadastrado
@Injectable()
export class CheckIsRegistrationPipe implements PipeTransform<CreateClientDto> {
  //Declarando serviço do repositório da entidade User
  constructor(
    @InjectRepository(Client)
    private usersRepository: Repository<Client>
  ){}

  async transform(value: CreateClientDto) {
    
    //Se o email de usuário já existe no banco de dados
    const findEmail = await this.usersRepository.find({
      where: {
        email: value.email
      }
    })

    //Se o cpf de usuário já existe no banco de dados
    const findCpf = await this.usersRepository.find({
      where: {
        cpf: value.cpf
      }
    })

    if(findEmail.length > 0){
      throw new BadRequestException('Esse email de usuário já esta cadastrado')
    }

    if(findCpf.length > 0){
      throw new BadRequestException('Esse cpf já esta cadastrado')
    }
    
    return value;

  }
}
