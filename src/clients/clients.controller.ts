import { Controller, Get, Post, Body, Patch, Param, Delete, Res, } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';
import { CheckIsRegistrationPipe } from './pipes/check-is-registration.pipe';

//autenticação
import { UseGuards } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

//autorização
import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { Roles } from 'src/autenticacao/autenticacao.decorator';

/** Controlador clients.
 *  @constructor
 *  @param {ClientsService} clientsService - serviço do cliente
 *  @param {CheckIsRegistrationPipe} checkIsRegistrationPipe - pipe customizado.
* */
@Controller('clients')
export class ClientsController {

  constructor(
    private readonly clientsService: ClientsService,
    private readonly checkIsRegistrationPipe: CheckIsRegistrationPipe,
  ) {}

  /** Cria um novo registro de cliente.
   *  @param {CreateClientDto} createClientDto - pipe validação de body CreateClient.
  * */
  @Post()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  async create(@Body() createClientDto: CreateClientDto, @Res() response: Response) {

    await this.checkIsRegistrationPipe.transform(createClientDto)
    .then(async (res) => {

      const result = await this.clientsService.create(createClientDto);
  
      return response.status(result.status).json(result)
    })
    .catch( (reason) => { response.status(400).json(reason) } );
    
  }

  /** Retorna todos os registros de cliente.
  * */
  @Get()
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  async findAll(@Res() response: Response) {
    const result = await this.clientsService.findAll();
    return response.status(result.status).json(result)
  }

  /** Retorna um registro de cliente pelo id absoluto.
   *  @param {Response} response - objeto express Response.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  @Get(':id')
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  async findOne(@Res() response:Response, @Param('id') id: string) {
    
    const result = await this.clientsService.findOne(+id);
    return response.status(result.status).json(result)
    
  }

  /** Atualiza registro por parâmetro de id.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  @Patch(':id')
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Res() response: Response) {
    const result = await this.clientsService.update(+id, updateClientDto);
    return response.status(result.status).json(result)
  }

  /** Método remove registro por parâmetro de id.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  //@HttpCode(204) //NoContent
  @Delete(':id')
  @Roles(Role.Client)
  @UseGuards(AutenticacaoGuard)
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.clientsService.remove(+id);
    return response.status(result.status).json(result)
  }
}
