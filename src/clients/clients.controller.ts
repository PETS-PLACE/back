import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, HttpException, Req, Res, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request, Response } from 'express';
import { CheckIsRegistrationPipe } from './pipes/check-is-registration.pipe';
import { Logger } from '@nestjs/common';

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
  async create(@Body() createClientDto: CreateClientDto) {
    await this.checkIsRegistrationPipe.transform(createClientDto)
    .catch( (reason) => { Logger.log(reason) } );
    return this.clientsService.create(createClientDto);
  }

  /** Retorna todos os registros de cliente.
  * */
  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  /** Retorna um registro de cliente pelo id absoluto.
   *  @param {Response} response - objeto express Response.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  @Get(':id')
  async findOne(@Res() response:Response, @Param('id') id: string) {
    
    const result = this.clientsService.findOne(+id);

    result.then(res => {
      if (res == null) {
        return response.status(404).json({
          msg: "Usuário não encotrado"
        });
      } else {
        return response.status(200).json(res);
      }
    }).catch(err => {
      console.log(err);
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    });
    
  }

  /** Atualiza registro por parâmetro de id.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  /** Método remove registro por parâmetro de id.
   *  @param {string} id - id absoluto do banco de dados.
  * */
  @HttpCode(204) //NoContent
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
