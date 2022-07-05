import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from 'src/models/user.model';
import { RolesService } from '../roles/roles.service';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: Repository<User>, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEMail(email: string): Promise<User>;
    updateUser(id: number, opts: UpdateUserDto): Promise<[affectedCount: number]>;
    deleteUser(id: string): Promise<number>;
}
