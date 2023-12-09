import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//import { Contatos } from 'src/petshop/entities/contatos.entity';
import { Contatos } from './entities/contatos.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';

import { CreateContatoDto } from './dto/create-contato.dto';
import { EditarContatoDto } from './dto/edit-contato.dto';
import { FindContatosDto } from './dto/find-contatos.dto';
import { DeleteContatoDto } from './dto/delete-contato.dto';

/* campos que requerem id
 * exigem que o cliente tenha
 * uma lista temporária de
 * id's dos contatos obtida em
 * um get.
*/

@Injectable()
export class ContatosService {

  constructor(
    @InjectRepository(Contatos) private contatosRepo: Repository<Contatos>,
    @InjectRepository(Petshop) private petshopRepo: Repository<Petshop>
  ){}

  private async petshopExiste( nomeComercial: string ): Promise<Petshop> {
      const petshop =  await this.petshopRepo.findOne({
        where:{
          nomeComercial: nomeComercial
        }
      });

      if ( petshop == null ) throw new Error('petshop requisitado não existe');
      else return petshop;
  }

  /** Cria e salva contato para usuário com base no nomeEstabelecimento. */
  async salvarContato( createContatoDto: CreateContatoDto ) {
    try {

      const petshop = await this.petshopExiste( createContatoDto.nomeComercial );

      const contato = new Contatos();
      contato.info = createContatoDto.info;
      contato.petshop = petshop;
      return this.contatosRepo.save( contato );
    }
    catch( err ) {
      throw new Error( err );
    }
  }

  async editarContato( editarContatoDto: EditarContatoDto ) {
    try {
      return await this.contatosRepo.update({ id: editarContatoDto.id }
        ,{info: editarContatoDto.info});
    }
    catch( err ) {
      throw new Error( err );
    }
  }

  async lerContatos( findContatosDto: FindContatosDto ) {
    try {
      const petshop = await this.petshopExiste( findContatosDto.nomeComercial );
      return await this.petshopRepo.createQueryBuilder('petshop')
        .leftJoinAndSelect('petshop.contatos', 'contatos')
        .where('contatos.petshop = :idPetshop', {idPetshop:petshop.id})
        .getMany();
    }
    catch( err ) {
      throw Error( err );
    }
  }

  async deletarContato( deleteContatoDto: DeleteContatoDto ) {
    try {

      const petshop = await this.petshopExiste( deleteContatoDto.nomeComercial );

      const alvo = await this.petshopRepo.createQueryBuilder('petshop')
        .leftJoinAndSelect('petshop.contatos', 'contatos')
        .where('contatos.petshop = :idPetshop', {idPetshop:petshop.id})
        .getOne();

      if ( alvo == null ) return [];

      return await this.contatosRepo.delete( alvo.id );
    }
    catch( err ) {
      throw new Error( err );
    }
  }

}
