import { CreateContatoDto } from './create-contato.dto';
import { PickType } from '@nestjs/mapped-types';

export class EditarContatoDto extends PickType(CreateContatoDto, ['info']) {
};

