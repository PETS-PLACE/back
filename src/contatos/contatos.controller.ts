import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
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

@Controller('contatos')
export class ContatosController {

  constructor(
    private readonly contatosService: ContatosService,
  ){}

  @Post()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  async criarContato(
    @Body(new ValidationPipe()) createContatoDto: CreateContatoDto
  ): Promise<any> {
    try
    {
      return await this.contatosService.salvarContato( createContatoDto );
    }
    catch( err )
    {
      throw new InternalServerErrorException({
        statusCode:500,
        mensagem:'servidor não conseguiu salvar contato para usuario',
        detalhes: err
      });
    }
  }

  @Put()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  async editarContato(
    @Body(new ValidationPipe()) editarContatoDto: EditarContatoDto 
  ): Promise<any> {
    try{
      return await this.contatosService.editarContato( editarContatoDto );
    }
    catch( err ){
      throw new InternalServerErrorException({
        statusCode:500,
        mensagem:'servidor não conseguiu editar contato para usuario',
        detalhes: err
      });
    }
  }

  @Get()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  async lerContatos(
    @Body(new ValidationPipe()) findContatosDto: FindContatosDto
  ): Promise<any> {
    try{
      return await this.contatosService.lerContatos( findContatosDto );
    }
    catch(err){
      throw new InternalServerErrorException({
        statusCode:500,
        mensagem:'ler contatos para usuario requisitado',
        detalhes: err
      });
    }
  }

  @Delete()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  async deletarContato(
    @Body(new ValidationPipe()) deleteContatoDto: DeleteContatoDto
  ): Promise<any> {
    try{
      return this.contatosService.deletarContato( deleteContatoDto );
    }
    catch( err ){
      throw new InternalServerErrorException({
        statusCode:500,
        mensagem:'delecao de contato falhou para usuario requistado',
        detalhes: err
      });
    }
  }

}

