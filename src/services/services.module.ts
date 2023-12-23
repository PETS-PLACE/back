import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petshop } from 'src/petshop/entities/petshop.entity';
import { Service } from './entities/service.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Petshop, Service]) ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
