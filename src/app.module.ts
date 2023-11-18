import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: 'petsplacedata',
      entities: [
        Client
      ],
      synchronize: true,
    }),
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
