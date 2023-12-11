import { IsNotEmpty, IsString } from "class-validator";

/** Requer campos "nome" e "password" de
*   ambos os usuarios.*/
export class CreateTokenDto {

  @IsNotEmpty({message:'campo nome vazio'})
  @IsString({message:'campo nome nao string'})
  nome: string;

  @IsNotEmpty({message:'campo senha vazio'})
  @IsString({message:'campo senha nao string'})
  senha: string;

  @IsNotEmpty({message:'campo tipo de conta vazio'})
  @IsString({message:'campo tipo de conta nao string'})
  tipo: 'client'|'petshop';
}

