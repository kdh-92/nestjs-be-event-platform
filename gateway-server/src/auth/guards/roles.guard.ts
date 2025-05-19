import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('인증 정보가 없습니다.');
    }
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return requiredRoles.includes(user?.role);
  }
}
