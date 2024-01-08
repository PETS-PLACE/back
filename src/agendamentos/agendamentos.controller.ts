import { Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

//autenticação
import { UseGuards } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

//autorização
import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { Roles } from 'src/autenticacao/autenticacao.decorator';
import { UsuarioTipoGuard } from 'src/autenticacao/autenticacao.RolesGuard';


// apenas clientes tem acesso à seus agendadmentos.
@Controller('agendamentos')
export class AgendamentosController {

  constructor(
    private readonly agendamentoService: AgendamentosService
  ){}

  @Post()
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  @UseGuards(UsuarioTipoGuard)
  async novoAgendamento(
    @Body(new ValidationPipe()) createAgendamentoDto: CreateAgendamentoDto,
    @Req() request: Request
  ){ 
    return await this.agendamentoService.crateAgendamento( createAgendamentoDto, request );
  }

  @Get()
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  @UseGuards(UsuarioTipoGuard)
  async obterAgendamentosDoClienteToken( @Req() request: Request ){
    return await this.agendamentoService.findAllAgendamentosDoUsuario( request );
  }

}
