import { Model } from 'sequelize-typescript';
import { User } from './user.model';
interface PostCreationAttrs {
    title: string;
    content: string;
}
export declare class Post extends Model<Post, PostCreationAttrs> {
    id: number;
    uri: string;
    date: Date;
    title: string;
    content: string;
    author: User[];
}
export {};
