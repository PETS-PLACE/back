import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';

import { CreateTokenDto } from './dto/create-token.dto';

type Retorno = {
  status:number;
  result?:{access_token:string};
  message?:string
};

type Token =
{
  sub:number;
  nome:string;
  tipo:string
};

@Injectable()
export class AutenticacaoService {

  /*refatoração futura: alterar manipulação direta dos
  * repositórios por métodos em no serviço de clients e petshop*/
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Petshop) private petshopRepository: Repository<Petshop>,
    private readonly jwtService: JwtService
  ) {}

  private async gerarTokenJWT( createTokenDto: CreateTokenDto )
  : Promise<Retorno> {

    let usuario: Client|Petshop;
    let carga: Token; //definir type dentro de autenticacao.
    let tipo = undefined;

    try {
      if ( createTokenDto.tipo == 'client' ) {
        usuario = await this.clientRepository.findOne({
            where: {
              nome: createTokenDto.nome
            }
          });
        tipo = 'client';
      }
      else if ( createTokenDto.tipo == 'petshop' ) {
        usuario = await this.petshopRepository.findOne({
            where: {
              nome: createTokenDto.nome
            }
          });
        tipo = 'petshop';
      }
      else {
        return {
          status: 500,
          message: 'O método responsavel criar o token não conseguiu determinar o tipo da conta'
        }
      };

      carga = {
        sub: usuario.id,
        nome: usuario.nome,
        tipo: tipo          //utilizado para ROLE BASED ACCESS CONTROL
      };
      
      if ( usuario.nome == createTokenDto.nome && usuario.password == createTokenDto.senha ) {
        return {
          status: 200,
          result: {
            access_token:
              await this.jwtService.signAsync(carga)
          }
        }
      }
      return {
        status: 401,
        message: 'acesso negado: credenciais inválidas'
      }
    }
    catch( err ) {
      return {
        status: 500,
        message: 'consulta à conta do cliente ou petshop falhou. ' + err
      }
    }
  }

  /** Verifica credenciais e retona
   *  autenticacao para acesso a
   *  rotas especificas.
   *  @returns {any} token ou mensagem de erro
   *  que deve desencadear codigo 401 no controller
   *  responsavel.
  * */
  async concederSessao(
    createTokenDto: CreateTokenDto
  ): Promise<Retorno> {
    return await this.gerarTokenJWT( createTokenDto );
  }
};
 
