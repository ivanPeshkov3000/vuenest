import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create_user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private genToken;
    private validateUser;
}
