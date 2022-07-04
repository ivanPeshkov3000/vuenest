import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { UserRole } from 'src/models/user_roles.model';
import { UserPost } from 'src/models/user_post.model';
import { Post } from 'src/models/post.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Post, UserPost]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
