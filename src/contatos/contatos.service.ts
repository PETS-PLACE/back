import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

//import { Contatos } from 'src/petshop/entities/contatos.entity';
import { Contatos } from './entities/contatos.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';

import { CreateContatoDto } from './dto/create-contato.dto';
import { EditarContatoDto } from './dto/edit-contato.dto';

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

  private async petshopExiste( nome: string ): Promise<Petshop> {
      const petshop =  await this.petshopRepo.findOne({
        where:{
          nome: nome
        }
      });

      if ( petshop == null ) throw new InternalServerErrorException({
        status: 500,
        msg: 'petshopExiste() não conseguiu retornar petshop do banco de dados'
      });
      else return petshop;
  }

  /** Cria e salva contato para usuário com base no nomeEstabelecimento. */
  async salvarContato( createContatoDto: CreateContatoDto ) {
    try {

      const petshop = await this.petshopExiste( createContatoDto.nome );

      const contato = new Contatos();
      contato.info = createContatoDto.info;
      contato.petshop = petshop;
      return this.contatosRepo.save( contato );
    }
    catch( err ) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'não foi possível salvar contato',
        detalhes: err
      });
    }
  }

  async editarContato( editarContatoDto: EditarContatoDto, id: number ) {
    try {
      return await this.contatosRepo.update({ id: id }
        ,{info: editarContatoDto.info});
    }
    catch( err ) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'não foi possível editar contato',
        detalhes: err
      });
    }
  }

  async lerTodosContatos() {
    try {
      return await this.contatosRepo.find();
    }
    catch( err ) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'não foi possível obter todos contatos do petshop',
        detalhes: err
      });
    }
  }

  async deletarContato( id: number ) {
    try {
      return await this.contatosRepo.delete( id );
    }
    catch( err ) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'não foi possível deletar contato',
        detalhes: err
      });
    }
  }

}
