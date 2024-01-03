import { Module } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Petshop } from 'src/petshop/entities/petshop.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Petshop, Service])
  ],
  controllers: [AgendamentosController],
  providers: [AgendamentosService]
})
export class AgendamentosModule {}
