import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

/** Classe de validação extensora de CreateUserDto.
 *  @extends {CreateClientDto}
* */
export class UpdateClientDto extends PartialType(CreateClientDto) {

}
