import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/models/role.model';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );

      if (!requiredRoles) return true;


      const authHeader = req.headers.authorization;
      if (!authHeader) throw new HttpException({ message: 'В запросе отсутствует заголовок авторизации'}, HttpStatus.BAD_REQUEST)

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer != 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'Неверный токен' });

      const user = this.jwtService.verify(token);
      req.user = user;
      console.log("USER: ", user);
      return user.roles.some((role: Role) => requiredRoles.includes(role.name));
    } catch (error) {
      throw new HttpException(`Нет доступа. ${error.message}`, HttpStatus.FORBIDDEN);
    }
  }
}