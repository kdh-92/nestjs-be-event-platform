import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ROLE_ROUTE_MAP } from '../role-route.map';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const path = request.path;

    if (!user || !user.role) {
      throw new ForbiddenException('인증 정보가 없습니다.');
    }

    if (user.role === 'ADMIN') return true;

    const matched = ROLE_ROUTE_MAP.find(route => route.pattern.test(path));

    if (!matched) {
      throw new ForbiddenException('허용되지 않은 경로입니다.');
    }

    const hasRole = matched.roles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}
