import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

import { ContatosService } from './contatos.service';

import { CreateContatoDto } from './dto/create-contato.dto';
import { EditarContatoDto } from './dto/edit-contato.dto';
import { FindContatosDto } from './dto/find-contatos.dto';
import { DeleteContatoDto } from './dto/delete-contato.dto';

//autenticação
import { UseGuards } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

//autorização
import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { Roles } from 'src/autenticacao/autenticacao.decorator';
import { UsuarioTipoGuard } from 'src/autenticacao/autenticacao.RolesGuard';

@Controller('contatos')
export class ContatosController {

  constructor(
    private readonly contatosService: ContatosService,
  ){}

  @Post()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async criarContato(
    @Body(new ValidationPipe()) createContatoDto: CreateContatoDto
  ): Promise<any> {
    return await this.contatosService.salvarContato( createContatoDto );
  }

  @Put(':id')
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async editarContato(
    @Body(new ValidationPipe()) editarContatoDto: EditarContatoDto,
    @Param('id') id: number
  ): Promise<any> {
    return await this.contatosService.editarContato( editarContatoDto, id );
  }

  @Get(':nome')
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async lerContatos(
    @Param('nome') nome: string
  ): Promise<any> {
    return await this.contatosService.lerContatos( nome );
  }

  @Delete(':id')
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async deletarContato(
    @Param('id') id: number
  ): Promise<any> {
    return this.contatosService.deletarContato( id );
  }

}

