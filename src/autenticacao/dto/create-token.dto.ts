import { IsNotEmpty, IsString, IsEmail } from "class-validator";

/** Requer campos "nome" e "password" de
*   ambos os usuarios.*/
export class CreateTokenDto {

  @IsString({message:'campo nome nao string'})
  @IsNotEmpty({message:'campo nome vazio'})
  @IsEmail()
  email: string;

  @IsString({message:'campo senha nao string'})
  @IsNotEmpty({message:'campo senha vazio'})
  senha: string;

  @IsString({message:'campo tipo de conta nao string'})
  @IsNotEmpty({message:'campo tipo de conta vazio'})
  tipo: 'client'|'petshop';
}

