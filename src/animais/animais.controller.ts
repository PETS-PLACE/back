import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete} from '@nestjs/common';
import { Res, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { Roles } from 'src/autenticacao/autenticacao.decorator';
import { UsuarioTipoGuard } from 'src/autenticacao/autenticacao.RolesGuard';

import { CreateAnimalDto } from 'src/animais/dto/create-animal-dto';
import { UpdateAnimalDto } from 'src/animais/dto/update-animal-dto';

import { AnimaisService } from './animais.service';

/** Requerem nome de usuário para funcionarem */
@Controller('animais')
export class AnimaisController {

  constructor(
    private readonly animaisService: AnimaisService
  ) {}

  @Post()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  async registrarPetshop(
    @Body(new ValidationPipe()) createAnimalDto: CreateAnimalDto,
  ) {
    return await this.animaisService.novoRegistroAnimal( createAnimalDto );
  }

  @Get()
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  async findAll(
    @Body() updateAnimalDto: UpdateAnimalDto
  ){
    return await this.animaisService.todosRegistros( updateAnimalDto );
  }

  @Get(':id')
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  async findOne( @Param('id') id: string ) {
    return ;
  }

  @Patch(":id")
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDto: UpdateAnimalDto
  ) {
    return await this.animaisService.atualizarRegistroAnimal( id, updateAnimalDto );
  }

  @Delete(":id")
  @UseGuards(AutenticacaoGuard)
  @Roles(Role.Client)
  @UseGuards(UsuarioTipoGuard)
  async remove( @Param('id') id: number ) {
    return await this.animaisService.deleteRegistroAnimal( id );
  }

}
