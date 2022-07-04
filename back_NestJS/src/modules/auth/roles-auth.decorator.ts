import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleAuthGuard } from './role_auth.guard';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => applyDecorators(
  SetMetadata(ROLES_KEY, roles),
  UseGuards(RoleAuthGuard)
)
