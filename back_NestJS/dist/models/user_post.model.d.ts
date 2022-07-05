import { Model } from 'sequelize-typescript';
export declare class UserPost extends Model<UserPost> {
    id: number;
    post_id: number;
    user_id: number;
}
