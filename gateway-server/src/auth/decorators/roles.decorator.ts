import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
