import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { EstabelecimentosModule } from './estabelecimentos/estabelecimentos.module';

@Module({
  imports: [ClientesModule, EstabelecimentosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
