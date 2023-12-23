import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete} from '@nestjs/common';
import { Res, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { Roles } from 'src/autenticacao/autenticacao.decorator';
import { UsuarioTipoGuard } from 'src/autenticacao/autenticacao.RolesGuard';

import { CreateAnimalDto } from 'src/animais/dto/create-petshop-dto';
import { UpdateAnimalDto } from 'src/animais/dto/update-petshop-dto';

import { AnimaisService } from './animais.service';

@Controller('animais')
export class AnimaisController {

  constructor(
    private readonly animaisService: AnimaisService
  ) {}

  @Post()
  async registrarPetshop(
    @Body(new ValidationPipe()) createAnimalDto: CreateAnimalDto,
    @Res() response: Response
  ) {
    return ;
  }

  @Get()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async findAll(@Res() response: Response){
    return ;
  }

  @Get(':id')
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async findOne(@Res() response:Response, @Param('id') id: string) {
  }

  @Patch(":id")
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async update(
    @Res() response:Response,
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto
  ) {
  }

  @Delete(":id")
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Petshop)
  @UseGuards(UsuarioTipoGuard)
  async remove(@Res() response:Response, @Param('id') id: string) {
  }

}
