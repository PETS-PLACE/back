import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),    
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [AutenticacaoService]
})
export class AutenticacaoModule {}
