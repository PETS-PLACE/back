import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { Agendamentos } from './entity/agendamentos.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';
import { Animais } from 'src/animais/entity/animais.entity';
import { Service } from 'src/services/entities/service.entity';

import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Injectable()
export class AgendamentosService {

  constructor(
    @InjectRepository(Agendamentos) private agendamentosRepository: Repository<Agendamentos>,
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    @InjectRepository(Animais) private animaisRepository: Repository<Animais>,
    @InjectRepository(Petshop) private petshopRepository: Repository<Petshop>,
    @InjectRepository(Service) private servicosRepository: Repository<Service>,
    private jwtservice: JwtService
  ){
  }

  private async extractTokenFromHeader(req:Request): Promise<string> {
    //const token = req.headers.authorization?.toString();
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  /* campo nome de cliente não necessário **/
  async crateAgendamento( createAgendamentoDto: CreateAgendamentoDto, request: Request) {
    try{
      const token = await this.extractTokenFromHeader( request );
      const {nome} = await this.jwtservice.decode( token );

      const agendamento = {
        cpf: createAgendamentoDto.cpf,
        observacoes: createAgendamentoDto.observacoes,
        petshop: await this.petshopRepository.findOne({where:{id:createAgendamentoDto.petshopId}}),
        animal: await this.animaisRepository.findOne({where:{id:createAgendamentoDto.animalId}}),
        servico: await this.servicosRepository.findOne({where:{id:createAgendamentoDto.servicoId}}),
        cliente: await this.clientsRepository.findOne({where:{nome:nome}}), //do token
      };

      return {
        status: 200,
        result: this.agendamentosRepository.save( agendamento )
      }

    }
    catch(err) {
      throw new InternalServerErrorException({
        status: 500,
        message: "findAllAgendamentos() no backend falhou",
        detalhes: err
      });
    }
  }


  /** Retorna agendamentos de um usuário através do token{sub,nome,tipo}*/
  async findAllAgendamentosDoUsuario( request: Request ){
    try {
      const token = await this.extractTokenFromHeader( request );
      const nomeUsuario = await this.jwtservice.decode( token );
      if( nomeUsuario == '' ) return {status:500,message:"falha na decodificação do token"};
      const cliente = await this.clientsRepository.findOne({where:{nome:nomeUsuario.nome}});
      if( !cliente ) return {status:500,message:"falha ao obter cliente alvo pelo token"};
      return { status:200, result: await this.agendamentosRepository.find({where:{cliente:cliente}}) };
    }
    catch( err ){
      throw new InternalServerErrorException({
        status: 500,
        message: "findAllAgendamentos() no backend falhou"
      });
    }
  }

}
