import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { UserRole } from 'src/models/user_roles.model';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './posts/posts.module';
import { Post } from 'src/models/post.model';
import { UserPost } from 'src/models/user_post.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAMEDB,
      autoLoadModels: true,
      models: [User, Role, UserRole, Post, UserPost],
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    PagesModule
  ],
})
export class AppModule { }
