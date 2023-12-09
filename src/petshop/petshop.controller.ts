import { Controller, Res, Param, Patch, Delete } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePetshopDto } from './dto/create-petshop.dto';
import { ValidationPipe } from '@nestjs/common';
import { PetshopService } from './petshop.service';
import { ChecarPetshopsPipe } from './pipes/checar-petshops.pipe';
import { UpdatePetshopDto } from './dto/update-petshop.dto';

@Controller('petshop')
export class PetshopController {

  constructor(
    private readonly petshopService: PetshopService,
    private readonly petshopChecar: ChecarPetshopsPipe
  ){}

  /** Armazena dados do cliente e retorna
   *  representação dos dados salvos.
   *  @param {CreatePetshopDto} createPetshopDto - dados para o pipe.
  * */
  @Post()
  async registrarPetshop(
    @Body(new ValidationPipe()) createPetshopDto: CreatePetshopDto,
    @Res() response: Response
  ) {
    await this.petshopChecar.transform( createPetshopDto )
    .then(async () => {
      const result = await this.petshopService.salvarDadosPetshop( createPetshopDto );
      return response.status(result.status).json(result)
    })
    .catch((reason) => { response.status(400).json(reason) } )
    
  }

  @Get()
  async findAll(@Res() response: Response){
    const result = await this.petshopService.findAll()
    return response.status(result.status).json(result)
  }

  @Get(':id')
  async findOne(@Res() response:Response, @Param('id') id: string){
    const result = await this.petshopService.findOne(+id)
    return response.status(result.status).json(result)
  }

  @Patch(":id")
  async update(@Res() response:Response, @Param('id') id: string, @Body() updatePetshopDto: UpdatePetshopDto){
    const result = await this.petshopService.update(+id, updatePetshopDto)
    return response.status(result.status).json(result)
  }

  @Delete(":id")
  async remove(@Res() response:Response, @Param('id') id: string){
    const result = await this.petshopService.remove(+id)
    return response.status(result.status).json(result)
  }

}
