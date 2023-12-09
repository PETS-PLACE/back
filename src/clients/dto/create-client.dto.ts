import {
  IsInt, IsString, Length, IsEmail, IsNotEmpty,
  IsPositive, Min, IsStrongPassword, Max
} from "class-validator"

/** Classe com a definição de usuário para requisições
*   de criação com o método Post.
* */
export class CreateClientDto {

    @IsString({message: 'O nome deve ser uma string'})
    @IsNotEmpty({message: 'O nome deve ser informado'})
    nome: string

    @IsString({message: 'Um cpf deve ser uma string'})
    @IsNotEmpty({message: 'O cpf deve ser informado'})
    @Length(11,11,{message: 'CPF inválido. Certifique de ter 11 números no CPF'})
    cpf: string

    @IsString({message: 'O nome da rua deve ser uma string'})
    @IsNotEmpty({message: 'É necessário informar o nome da rua'})
    rua: string

    @IsNotEmpty({message: 'O número de residência deve ser informado'})
    @IsInt({message: 'O número de residência deve ser um número'})
    @IsPositive({message: 'É necessário informar número de residência positivo'})
    @Min(0,{message: 'É necessário informar número de residência positivo'})
    numero: number

    @IsString({message: 'O nome do bairro deve ser uma string'})
    @IsNotEmpty({message: 'É necessário informar o bairro'})
    bairro: string

    @IsString({message: 'O nome da cidade deve ser informado'})
    @IsNotEmpty({message: 'É necessário informar o nome da cidade'})
    cidade: string

    @IsString({message: 'O nome do Estado deve ser uma string'})
    @IsNotEmpty({message: 'É necessário informar o Estado'})
    estado: string

    @IsString({message: 'O Email deve ser uma string'})
    @IsNotEmpty({message: 'Um Email deve ser informado'})
    @IsEmail({},{message:'Email inválido'})
    email: string

    @IsString({message: 'A senha deve ser uma string'})
    @IsNotEmpty({message: 'É necessário informar uma senha'})
    @Length(8, 8, {message: 'A senha deve ter no minimo 8 caracteres'})
    password: string
}
