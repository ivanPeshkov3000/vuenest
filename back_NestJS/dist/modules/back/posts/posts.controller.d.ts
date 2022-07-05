import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NewPostDto } from './dto/new-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): NewPostDto;
    findAll(): Promise<import("../../../models/post.model").Post[]>;
    findOne(post_id: string): Promise<import("../../../models/post.model").Post>;
    update(post_id: string, updatePostDto: UpdatePostDto): Promise<[affectedCount: number]>;
    remove(post_id: string): Promise<number>;
}
