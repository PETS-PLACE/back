import { PartialType } from '@nestjs/mapped-types';
import { CreatePetshopDto } from './create-petshop.dto';

/** Classe de validação extensora de CreateUserDto.
 *  @extends {CreatePetshopDto}
* */
export class UpdatePetshopDto extends PartialType(CreatePetshopDto) {

}