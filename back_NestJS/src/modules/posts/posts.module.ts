import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';
import { UserPost } from 'src/models/user_post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, User, UserPost])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PagesModule {}
