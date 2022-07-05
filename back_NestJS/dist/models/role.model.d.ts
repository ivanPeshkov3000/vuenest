import { Model } from 'sequelize-typescript';
import { User } from './user.model';
interface RoleCreationAttrs {
    name: string;
    desc: string;
}
export declare class Role extends Model<Role, RoleCreationAttrs> {
    id: number;
    name: string;
    desc: string;
    rights: string[];
    scope: string[];
    users: User[];
}
export {};
