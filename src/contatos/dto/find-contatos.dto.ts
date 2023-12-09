import { CreateContatoDto } from './create-contato.dto';
import { PickType } from '@nestjs/mapped-types';

export class FindContatosDto extends PickType(CreateContatoDto, ['nomeComercial']) {
};
