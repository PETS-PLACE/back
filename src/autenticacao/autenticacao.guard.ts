import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const carga = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.SECRET
        }
      );
      request['user'] = carga;
    }
    catch (err) {
      throw new UnauthorizedException({status:401,message:'token não válido'});
    }

    return true;
  }

  extractTokenFromHeader(req:Request): string {
    //const token = req.headers.authorization?.toString();
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
}
