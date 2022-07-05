import { Model } from 'sequelize-typescript';
export declare class UserRole extends Model<UserRole> {
    id: number;
    role_id: number;
    user_id: number;
}
