import {
  IsString, IsNotEmpty,
} from "class-validator";

export class CreateContatoDto {

  @IsString({message:'O campo info deve ser string'})
  @IsNotEmpty({message:'O campo info está vazio'})
  info: string;

  @IsString({message:'O campo nome deve ser string'})
  @IsNotEmpty({message:'O campo nomecomercial está vazio'})
  nome: string;
}

