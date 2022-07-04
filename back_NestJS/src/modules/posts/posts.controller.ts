import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';


import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NewPostDto } from './dto/new-post.dto';

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @ApiOperation({
    summary: 'Создание новой записи',
    description: 'Запись должна содержать поля имени и URL'
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Структура записи json',
  })
  @ApiResponse({
    type: NewPostDto,
    status: 200,
    description: 'Созданная запись'
  })
  @Post('new')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/post/:post_id')
  findOne(@Param('post_id') post_id: string) {
    return this.postsService.findOneById(+post_id);
  }

  @Patch('/post/:post_id')
  update(@Param('post_id') post_id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+post_id, updatePostDto);
  }

  @Delete('/post/:post_id')
  remove(@Param('post_id') post_id: string) {
    return this.postsService.removePost(+post_id);
  }
}
