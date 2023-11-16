import { Module } from '@nestjs/common';
import { ContaController } from './conta/conta.controller';
import { ContaProvider } from './conta.provider/conta.provider';

@Module({
  controllers: [ContaController],
  providers: [ContaProvider]
})
export class ClientesModule {}
