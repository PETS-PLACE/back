import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, HttpException, Req, Res, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request, Response } from 'express';
import { CheckIsRegistrationPipe } from './pipes/check-is-registration.pipe';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly checkIsRegistrationPipe: CheckIsRegistrationPipe,
  ) {}

  //Decorador para definir o método da requisição
  @Post()
  //createClientDto é o objeto de transferencia da requisição contendo os dados que vem do body da requisição e ele é definido na pasta dto
  async create(@Body() createClientDto: CreateClientDto) 
  {

    //Usando pipe personalizado para verificação de usuário já cadastrado
    await this.checkIsRegistrationPipe.transform(createClientDto)
    return this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll() 
  {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Res() response:Response, @Param('id') id: string) {
    
    const result = this.clientsService.findOne(+id)

    //Fazendo tratamento de exeções do método findOne
    result.then(res => {
      if(res == null){
        return response.status(404).json({
          massagem: "Usuário não encotrado"
        })
      }

      else{
        return response.status(200).json(res)
      }

    }).catch(err => {
      throw new HttpException('Devido a um erro interno não foi possível encontra o usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    })
    
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @HttpCode(204) //no content
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
