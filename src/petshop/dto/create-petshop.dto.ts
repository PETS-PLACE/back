import {
  IsInt, IsString, Length, IsNotEmpty,
  IsPositive, Min, IsStrongPassword
} from "class-validator";

/** Classe com a definição de petshop para requisições
*   de criação com o método Post.
* */
export class CreatePetshopDto {

    @IsString({message: 'O nomeComercial deve ser informado como string'})
    @IsNotEmpty({message: 'A string nomeComercial informada está vazia'})
    nomeComercial: string;

    @IsString({message: 'Um CNPJ deve ser informado como string'})
    @IsNotEmpty({message: 'A string CNPJ informada está vazia'})
    @Length(14,14,{message: 'CNPJ inválido. Certifique de ter 14 números puros'})
    cnpj: string;

    @IsString({message: 'É necessário informar o nome da rua como string'})
    @IsNotEmpty({message: 'A string rua informada está vazia'})
    rua: string;

    @IsInt({message: 'É necessário informar o número de sua residência'})
    @IsPositive({message: 'É necessário informar número de residência não negativo'})
    @Min(0,{message: 'É necessário informar número de residência positivo'})
    numero: number;

    @IsString({message: 'É necessário informar o bairro'})
    @IsNotEmpty({message: 'A string bairro informada está vazia'})
    bairro: string;

    @IsString({message: 'É necessário informar o nome da cidade'})
    @IsNotEmpty({message: 'A string cidade informada está vazia'})
    cidade: string;

    @IsString({message: 'É necessário informar o Estado'})
    @IsNotEmpty({message: 'A string estado informada está vazia'})
    estado: string;

    @IsString({message: 'Uma string JSON de contatos deve ser informado'})
    @IsNotEmpty({message: 'A string JSON de contatos informada está vazia'})
    @Length(0,2048,{message: 'JSON de contatos Menor que zero ou maior que 2048'})
    contatos: string;

    @IsString({message: 'É necessário informar uma senha'})
    @IsNotEmpty({message: 'A string Email informada está vazia'})
    @IsStrongPassword({minLength:14},{message:'É necessário informar uma senha de 14 a 32 caracteres'})
    password: string;
}
