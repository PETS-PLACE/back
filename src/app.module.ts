import { Module, NestModule } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { PetshopModule } from './petshop/petshop.module';
import { Petshop } from './petshop/entities/petshop.entity';
import { Contatos } from './contatos/entities/contatos.entity';
import { ContatosModule } from './contatos/contatos.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_SERVER_IP_OR_HOSTNAME,
      port: 3306,
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: [
        Client,
        Petshop,
        Contatos
      ],
      synchronize: true,
    }),
    ClientsModule,
    PetshopModule,
    ContatosModule,
    AutenticacaoModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule implements NestModule {

    public configure(): void {
    }
}
