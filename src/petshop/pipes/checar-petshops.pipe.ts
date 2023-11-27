import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePetshopDto } from '../dto/create-petshop.dto';
import { Petshop } from '../entities/petshop.entity';

/** Verifica se certas informações já existem no banco de dados
*   impendindo duplicatas.
* */
@Injectable()
export class ChecarPetshopsPipe implements PipeTransform<CreatePetshopDto> {

  constructor(
    @InjectRepository(Petshop) private repoPetshops: Repository<Petshop>
  ){}

  /** Recebe os dados da requisição, valida de acordo com regras de negócio e
  *   os resultados.
  *   @param {CreatePetshopDto} petshop - dados da requisição para validar.
  * */
  async transform(petshop: CreatePetshopDto) {
    
    const pessoaJuridica = await this.repoPetshops.find({
      where: {
        cnpj: petshop.cnpj
      }
    });

    if (pessoaJuridica.length > 0) {
      throw new BadRequestException('Esse cnpj já existe');
    }
    
    return petshop;
  }
}

