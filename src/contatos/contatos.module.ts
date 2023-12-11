import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContatosController } from './contatos.controller';
import { ContatosService } from './contatos.service';
import { Contatos } from './entities/contatos.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contatos, Petshop])
  ],
  controllers: [ ContatosController ],
  providers: [ 
    ContatosService,
  ]
})
export class ContatosModule {}
