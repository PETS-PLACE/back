import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';

import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/destroy-token.dto';

@Injectable()
export class AutenticacaoService {

  /*refatoração futura: alterar manipulação direta dos
  * repositórios por métodos em no serviço de clients e petshop*/
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Petshop) private petshopRepository: Repository<Petshop>,
    private readonly jwtService: JwtService
  ) {}

  /** verifica tamanho de uma matriz generica
  *   @returns {boolean} true len=1, false len!=1*/
  private lenVerif( usuario:object[] ): boolean {
    if ( usuario.length > 0 && usuario.length < 2 ) {
      return true;
    }
    else if ( usuario.length == 0 ) {
      return false;
    }
    else if ( usuario.length > 1 ) {
      throw new Error('Crítico: Mais de um usuário com o mesmo nome');
    }
  }

  private async usuarioExiste( createTokenDto: CreateTokenDto ): Promise<boolean> {

    let usuario: Object[];

    try {
      if ( createTokenDto.tipo == 'client' ) {
        usuario = await this.clientRepository
          .createQueryBuilder()
          .from( Client, 'client' )
          .where('client.nome == :nome', {name: createTokenDto.nome } )
          .getMany();
        return this.lenVerif( usuario );
      }
      else if ( createTokenDto.tipo == 'petshop' ) {
        usuario = await this.petshopRepository
          .createQueryBuilder()
          .from( Petshop, 'petshop' )
          .where('petshop.nome == :nome', {name: createTokenDto.nome } )
          .getMany();
        return this.lenVerif( usuario );
      }
      else {
        throw new Error('gerarTokenJWT() Tipo de conta inválida.');
      }
    }
    catch( err ) {
      throw new Error( err );
    }
    
  }

  private async gerarTokenJWT( createTokenDto: CreateTokenDto ): Promise<object|null> {
    if ( await this.usuarioExiste( createTokenDto ) ) {
      const carga = {
        sub: createTokenDto.nome,
        secret: require('crypto').randomBytes(32).toString('hex'),
      };
      return {
        access_token:
          await this.jwtService.signAsync(carga)
      };
    }
    return {
      status: 404,
      message: 'usuario não existente. token não criado'
    };
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
  ): Promise<object|null> {
    //armazenar
    return await this.gerarTokenJWT( createTokenDto );
  }

  /** Remove token do servidor. */
  async encerrarSessao( deleteTokenDto: DeleteTokenDto ) {
    //deletar token
  }

  /** Recebe token e valida ação:
  *   campo vazio nega automaticamente a ação.*/
  async autorizarAcao() {
    return;
  }

};
 
