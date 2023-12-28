import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimaisController } from './animais.controller';
import { AnimaisService } from './animais.service';

import { Animais } from './entity/animais.entity';
import { Client } from '../clients/entities/client.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Animais,Client]) ],
  controllers: [AnimaisController],
  providers: [AnimaisService]
})
export class AnimaisModule {}
