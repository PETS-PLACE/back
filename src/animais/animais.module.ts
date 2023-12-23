import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimaisController } from './animais.controller';
import { AnimaisService } from './animais.service';

import { Animais } from './entity/animais.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Animais]) ],
  controllers: [AnimaisController],
  providers: [AnimaisService]
})
export class AnimaisModule {}
