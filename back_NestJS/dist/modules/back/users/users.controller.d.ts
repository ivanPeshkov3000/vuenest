import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("../../../models/user.model").User[]>;
    getUserById(id: number): Promise<import("../../../models/user.model").User>;
    getUserByEMail(email: string): Promise<import("../../../models/user.model").User>;
    createUser(createDto: CreateUserDto): Promise<import("../../../models/user.model").User>;
    updUser(id: string, updateUserDto: UpdateUserDto): Promise<[affectedCount: number]>;
    delUser(id: string): Promise<"Deleted" | "Not found">;
}
