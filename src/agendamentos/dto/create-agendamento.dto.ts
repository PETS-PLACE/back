import {
    IsString, IsNotEmpty, IsNumber, IsOptional
} from "class-validator";

export class CreateAgendamentoDto {

    @IsNotEmpty({message: 'O animalId não pode estar vazio'})
    @IsString()
    cpf: string;

    @IsOptional()
    @IsString({message: 'A descrição deve ser informada como string'})
    observacoes?: string;

    @IsNumber({},{message:'O animalId deve ser numérico'})
    @IsNotEmpty({message: 'O animalId não pode estar vazio'})
    animalId: number;

    @IsNumber({},{message:'O petshopId deve ser numérico'})
    @IsNotEmpty({message: 'O petshopId não pode estar vazio'})
    petshopId: number;

    @IsNumber({},{message:'O servicoId deve ser numérico'})
    @IsNotEmpty({message: 'O servicoId não pode estar vazio'})
    servicoId: number;

    //clientId não necessário devido ao JWT token

}

