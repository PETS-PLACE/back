import { Controller } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { NotImplementedException } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { Header } from '@nestjs/common';

import { CreateTokenDto } from './dto/create-token.dto';

import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao.guard';;

import { UsuarioTipoGuard } from './autenticacao.RolesGuard';
import { Role } from './enumeracoes/role.enum';
import { Roles } from './autenticacao.decorator';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService
  ) {}

  @Post()
  @Header('Content-Type','application/json')
  async obterSessao(
    @Body(new ValidationPipe()) createTokenDto: CreateTokenDto,
    @Res() response: Response
  ) {
    const retorno = await this.autenticacaoService.concederSessao( createTokenDto );
    if ( retorno.status == 200 )
    {
      response
        .status(200)
        .set('Authorization', retorno.result.access_token )
        .send( { status:retorno.status } );
    }
    else {
    response
      .status(401)
      .json( retorno );
    }

  }

  /** teste apenas para clientes */
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  @Delete()
  async test() {
    throw new NotImplementedException();
  }
}
