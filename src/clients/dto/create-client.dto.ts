import { IsInt, IsString, Length} from "class-validator"

//classe que define o objeto de criação de user que é transferido pela requisição 
export class CreateClientDto {
    //Usando class-validator para validação dos dados
    @IsString({message: 'O nome deve ser informado'})
    nome: string

    @IsString({message: 'Um cpf deve ser informado'})
    @Length(11,11,{message: 'CPF inválido. Certifique de ter 11 números no CPF'})
    cpf: string

    @IsString({message: 'É necessário imformar o nome da rua'})
    rua: string

    @IsInt({message: 'É necessário imformar o número de sua residência'})
    numero: number

    @IsString({message: 'É necessário imformar o bairro'})
    bairro: string

    @IsString({message: 'É necessário imformar o nome da cidade'})
    cidade: string

    @IsString({message: 'É necessário imformar o Estado'})
    estado: string

    @IsString({message: 'Um email deve ser informado'})
    email: string

    @IsString({message: 'É necessário informa uma senha'})
    password: string
}