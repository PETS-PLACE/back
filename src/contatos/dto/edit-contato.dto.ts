import { CreateContatoDto } from './create-contato.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class EditarContatoDto extends PickType(CreateContatoDto, ['info']) {

  @IsNotEmpty({message:'O campo id esta vazio'})
  @IsNumber({},{message:'O campo id dever ser number'})
  id: number;
};

