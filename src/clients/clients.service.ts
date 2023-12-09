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
    
    try {
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
  
      const result = await this.usersRepository.save(createUser);
      
      return {
        status: 200,
        result
      }

    } catch (error) {
      return {
        status: 500,
        message: 'Devido a um erro interno não foi possível realizar o cadastro'
      }
    }
  }


  async findAll(){
    try {
      const result = await this.usersRepository.find();

      if(result.length <= 0){
        return {
          status: 404,
          message: 'Nenhum cliente encontrado'
        }
      }
      
      return {
        result,
        status: 200
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Devido a um erro interno não foi possível realizar a buscar os clientes'
      }
    }
  }

  /** Retorna um usário pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  * */
  async findOne(id: number) {
    try {
      const result = await this.usersRepository.findBy({id});

      if(result.length <= 0){
        return {
          status: 404,
          message: 'Cliente não encontrado'
        }
      }

      return {
        status: 200,
        result
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Devido a um erro interno não foi possível realizar a buscar o cliente'
      }
    }
  }

  /** Atualiza um cliente pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  * */
  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const findClient = await this.usersRepository.findBy({id});

      if(findClient.length > 0){

        const result = await this.usersRepository.update(id, updateClientDto);
        return {
          status: 200,
          message: 'Informações atualizadas com sucesso'
        }
      }

      else{
        return {
          status: 400,
          message: 'Cliente não encontrado'
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Devido a um erro interno não foi possível atualizar as informações do cliente'
      }
    }
  }

  /** Remove um cliente pelo id absoluto. CreateClient.
   *  @param {number} id - id do cliente.
  * */
  async remove(id: number) {
    try {
      const findClient = await this.usersRepository.findBy({id});

      if(findClient.length > 0){

        await this.usersRepository.delete(id);
        return {
          status: 200,
          message: 'Cliente excluído com sucesso'
        }
      }

      else{
        return {
          status: 400,
          message: 'Cliente não encontrado'
        }
      }
    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível excluir o cliente'
      }
    }
  }
}
