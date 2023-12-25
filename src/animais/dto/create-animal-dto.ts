import {
  IsString, IsNotEmpty, IsNumber
} from "class-validator";

export class CreateAnimalDto {

  /** Nome de usuário do cliente que é único */
  @IsString({message:'O campo cliente deve ser string'})
  @IsNotEmpty({message:'O campo cliente está vazio'})
  cliente: string;

  /** Nome do animal */
  @IsString({message:'O campo nome deve ser string'})
  @IsNotEmpty({message:'O campo nome está vazio'})
  nome: string;

  @IsString({message:'O campo especie deve ser string'})
  @IsNotEmpty({message:'O campo especie está vazio'})
  especie: string;

  @IsNumber({},{message:'O campo idade deve ser number'})
  @IsNotEmpty({message:'O campo idade está vazio'})
  idade: number;

  @IsNumber({},{message:'O campo peso deve ser float'})
  @IsNotEmpty({message:'O campo peso está vazio'})
  peso: number;

}

