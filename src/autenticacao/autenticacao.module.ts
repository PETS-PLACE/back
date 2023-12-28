import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '../clients/clients.module';

import { Client } from '../clients/entities/client.entity';
import { Petshop } from '../petshop/entities/petshop.entity';
import { Contatos } from '../contatos/entities/contatos.entity';

//secret para verificação de assinatura JWT em .env 
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Petshop, Contatos]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1800s' },
    }),    
    ClientsModule
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [AutenticacaoModule]
})
export class AutenticacaoModule {}
