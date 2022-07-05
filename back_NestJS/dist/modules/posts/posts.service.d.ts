import { Repository } from 'sequelize-typescript';
import { Post } from 'src/models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { NewPostDto } from './dto/new-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    create(createPostDto: CreatePostDto): NewPostDto;
    findOneById(id: number): Promise<Post>;
    findAll(): Promise<Post[]>;
    findAllofTitle(title: string): Promise<Post[]>;
    findAllofContent(content: any): Promise<Post[]>;
    findAllofDate(date: Date): Promise<Post[]>;
    updatePost(id: number, updatePostDto: UpdatePostDto): Promise<[affectedCount: number]>;
    removePost(id: number): Promise<number>;
}
