import {
    IsString, IsNotEmpty, IsNumber, IsOptional
} from "class-validator";

export class CreateServiceDto {
    @IsString({message: 'O nome deve ser informado como string'})
    @IsNotEmpty({message: 'O nome do serviço deve ser informado.'})
    name: string;

    @IsOptional()
    @IsString({message: 'A descrição deve ser informada como string'})
    //@IsNotEmpty({message: 'A descrição deve ser informada.'})
    description?: string;

    @IsOptional()
    @IsNumber({}, {message: 'A custo deve ser informada como número'})
    //@IsNotEmpty({message: 'O custo do serviço deve ser informado.'})
    cost?: number;

    @IsNotEmpty({message: 'O Pet shop deve ser informado.'})
    petShopId: number;
}
