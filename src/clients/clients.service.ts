import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

/** Provedor/Serviço para controlador clients.
 *  @constructor
 *  @param {Repository<Client>} usersRepository - Manipulador de dados conforme Entidade.
* */
@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private usersRepository: Repository<Client>
  ){}

  /** Cria cliente no banco de dados conforme a entidade CreateClient.
   *  @param {CreateClientDto} createClientDto - Data Transfer Object para CreateClient.
   *  @returns {Promise<DeepPartial<Client[]>>} - Entidades salvas.
  * */
  async create(createClientDto: CreateClientDto): Promise<any> {
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

    return await this.usersRepository.save(createUser);
  }

  /** Retorna todos clientes conforme entidade CreateClient
   *  @returns {Promise<Client[]>} Entidades client.
  * */
  async findAll(): Promise<Client[]> {
    return await this.usersRepository.find();
  }

  /** Retorna um usário pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  *   @returns {Promise<Client[]>} - Entidades client.
  * */
  async findOne(id: number): Promise<Client[]> {
    return this.usersRepository.findBy({id});
  }

  /** Atualiza um cliente pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  *   @returns {Promise<UpdateResult>}
  * */
  async update(id: number, updateClientDto: UpdateClientDto): Promise<any> {
    return this.usersRepository.update(id, updateClientDto);
  }

  /** Remove um cliente pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  *   @returns {Promise<DeleteResult>}
  * */
  async remove(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
