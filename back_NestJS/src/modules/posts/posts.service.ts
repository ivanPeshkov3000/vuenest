import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Post } from 'src/models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { NewPostDto } from './dto/new-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: Repository<Post>,) {}

  create(createPostDto: CreatePostDto): NewPostDto {
    const Post: NewPostDto = {
      title: createPostDto.title,
      url: createPostDto.url,
      content: "hey ho!",
      author: "inkognito"
    }
    return Post;
  }

  findOneById(id: number) {
    const post = this.postRepository.findOne({ where: {id}});
    return post;
  }
  
  findAll() {
    return this.postRepository.findAll();
  }

  findAllofTitle(title: string) {
    const posts = this.postRepository.findAll({ where: {title}})
    return posts;
  }

  findAllofContent(content) {
    const posts = this.postRepository.findAll({ where: { content } })
    return posts;
  }

  findAllofDate(date: Date) {
    const posts = this.postRepository.findAll({ where: { date } })
    return posts;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(updatePostDto, { where: { id } });
  }

  async removePost(id: number) {
    return await this.postRepository.destroy({ where: { id } });
  }
}
