import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, HttpException, Req, Res, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request, Response } from 'express';
import { CheckIsRegistrationPipe } from './pipes/check-is-registration.pipe';

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

  /** Método que cria um novo registro de cliente.
   *  @param {CreateClientDto} createClientDto - pipe validação de body.
  * */
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    await this.checkIsRegistrationPipe.transform(createClientDto);
    return this.clientsService.create(createClientDto);
  }

  /** Método retorna todos os registros de usuário.
  * */
  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  /** Método retorna registro específico por parâmetro de id.
  * */
  @Get(':id')
  async findOne(@Res() response:Response, @Param('id') id: string) {
    
    const result = this.clientsService.findOne(+id);

    result.then(res => {
      if (res == null) {
        return response.status(404).json({
          massagem: "Usuário não encotrado"
        })
      } else {
        return response.status(200).json(res)
      }

    }).catch(err => {
      throw new HttpException('Devido a um erro interno não foi possível encontra o usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    });
    
  }

  /** Método atualiza registro por parâmetro de id.
  * */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  /** Método remove registro por parâmetro de id.
  * */
  @HttpCode(204) //no content
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
