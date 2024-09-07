import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse<Response>();
    try {
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        this.redirectToLogin(res, 'User is not authorized');
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.redirectToLogin(res, 'Token expired');
      } else {
        this.redirectToLogin(res, 'Invalid token');
      }
    }
  }

  private throwUnauthorizedException(message: string): never {
    throw new UnauthorizedException({ message });
  }

  private redirectToLogin(res: Response, message: string): never {
    res.redirect(302, '/admin-login');
    this.throwUnauthorizedException(message);
  }
}
