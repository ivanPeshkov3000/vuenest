import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { UserRole } from 'src/models/user_roles.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRole]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
