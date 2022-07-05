import { Model } from 'sequelize-typescript';
import { Role } from './role.model';
import { Post } from './post.model';
interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Role[];
    posts: Post[];
}
export {};
