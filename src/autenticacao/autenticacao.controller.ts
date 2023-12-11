import { Controller } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/destroy-token.dto';


@Controller('autenticacao')
export class AutenticacaoController {
  constructor() {
  }

  @Post()
  async obterSessao(
    @Body(new ValidationPipe()) createTokenDto: CreateTokenDto
  ) {
    return '';
  }

  @Delete()
  async encerrarSessao(
    @Body(new ValidationPipe()) deleteTokenDto: DeleteTokenDto
  ) {
    return '';
  }
}
