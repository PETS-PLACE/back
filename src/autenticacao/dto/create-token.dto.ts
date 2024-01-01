import { IsNotEmpty, IsString, IsEmail } from "class-validator";

/** Requer campos "nome" e "password" de
*   ambos os usuarios.*/
export class CreateTokenDto {

  @IsNotEmpty({message:'campo email vazio'})
  @IsString({message:'campo email não string'})
  @IsEmail()
  email: string;

  @IsNotEmpty({message:'campo senha vazio'})
  @IsString({message:'campo senha nao string'})
  senha: string;

  @IsNotEmpty({message:'campo tipo de conta vazio'})
  @IsString({message:'campo tipo de conta nao string'})
  tipo: 'client'|'petshop';
}

