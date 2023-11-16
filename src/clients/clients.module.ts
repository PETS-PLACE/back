import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CheckIsRegistrationPipe } from './pipes/check-is-registration.pipe';

@Module({
  //Importando repositório da entidade Client
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    //Utilizando pipe de verificção de usuário já cadastrado
    CheckIsRegistrationPipe
  ],
})
export class ClientsModule {}
