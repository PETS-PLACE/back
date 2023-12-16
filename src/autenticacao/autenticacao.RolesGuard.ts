import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Role } from 'src/autenticacao/enumeracoes/role.enum';
import { ROLES_KEY } from 'src/autenticacao/autenticacao.decorator';

import { Request } from 'express';

@Injectable()
export class UsuarioTipoGuard implements CanActivate {

  // refletor pega o metadado decorado de que quem pode acessar a rota.
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate( context: ExecutionContext ): boolean {

    //coletando o metadado decorado em tal rota.
    const usuarioRequerido = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //coletando o token do request para obtenção do campo tipo.
    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization.split(' ')[1];

    if ( !token )
    {
      console.error( 'Token inválido no campo authorization' );
      return false;
    }

    const { tipo } = this.jwtService.decode( token );
    
    // verifica se decorado é igual ao campo do token.
    if ( usuarioRequerido[0] == tipo ) {
      return true;
    }
    return false;

  }
}

