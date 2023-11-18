import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/** Pipe de validação customizado se name (username) já foi cadastrado.
 *  @constructor
 *  @param {Client} usersRepository - Entidade definida do cliente.
 * */
@Injectable()
export class CheckIsRegistrationPipe implements PipeTransform<CreateClientDto> {

  constructor(
    @InjectRepository(Client)
    private usersRepository: Repository<Client>
  ){}

  /** Consulta banco de dados verificando a pré-existência
   *  de email e cpf.
   *  @param {CreateClientDto} value - dto do cliente para create.
  * */
  async transform(value: CreateClientDto) {
    
    const findEmail = await this.usersRepository.find({
      where: {
        email: value.email
      }
    })

    const findCpf = await this.usersRepository.find({
      where: {
        cpf: value.cpf
      }
    })

    if (findEmail.length > 0) {
      throw new BadRequestException('Esse email de usuário já esta cadastrado')
    }

    if (findCpf.length > 0) {
      throw new BadRequestException('Esse cpf já esta cadastrado')
    }
    
    return value;

  }
}
