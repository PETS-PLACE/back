import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

//A validação de dados que foi definida no CreateUserDto também se aplica ao UpdateUserDto atraves do extends PartialType
export class UpdateClientDto extends PartialType(CreateClientDto) {}
