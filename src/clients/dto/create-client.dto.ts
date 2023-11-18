import {
  IsInt, IsString, Length, IsEmail, IsEmpty,
  IsNegative, Min, IsStrongPassword
} from "class-validator"

/** Classe com a definição de usuário para requisições
*   de criação com o método Post.
* */
export class CreateClientDto {

    @IsString({message: 'O nome deve ser informado'})
    @IsEmpty({message: 'A string nome informada está vazia'})
    nome: string

    @IsString({message: 'Um cpf deve ser informado'})
    @IsEmpty({message: 'A string CPF informada está vazia'})
    @Length(11,11,{message: 'CPF inválido. Certifique de ter 11 números no CPF'})
    cpf: string

    @IsString({message: 'É necessário informar o nome da rua'})
    @IsEmpty({message: 'A string rua informada está vazia'})
    rua: string

    @IsInt({message: 'É necessário informar o número de sua residência'})
    @IsNegative({message: 'É necessário informar número de residência não negativo'})
    @Min(0,{message: 'É necessário informar número de residência positivo'})
    numero: number

    @IsString({message: 'É necessário informar o bairro'})
    @IsEmpty({message: 'A string bairro informada está vazia'})
    bairro: string

    @IsString({message: 'É necessário informar o nome da cidade'})
    @IsEmpty({message: 'A string cidade informada está vazia'})
    cidade: string

    @IsString({message: 'É necessário informar o Estado'})
    @IsEmpty({message: 'A string estado informada está vazia'})
    estado: string

    @IsString({message: 'Um Email deve ser informado'})
    @IsEmpty({message: 'A string Email informada está vazia'})
    @IsEmail({},{message:'O Email passado está inválido. Caso não: contate Back'})
    email: string

    @IsString({message: 'É necessário informar uma senha'})
    @IsEmpty({message: 'A string Email informada está vazia'})
    @IsStrongPassword({minLength:14},{message:'É necessário informar uma senha de 14 a 32 caracteres'})
    password: string
}
