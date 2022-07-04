import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../users/dto/create_user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.genToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const userFound = await this.userService.getUserByEMail(userDto.email);
    if (userFound)
      throw new HttpException(
        'Такой email уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    const hashPass = await bcrypt.hash(userDto.password, bcrypt.genSaltSync());
    const user = await this.userService.createUser({ ...userDto, password: hashPass });
    return this.genToken(user);
  }

  private genToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByEMail(userDto.email);
      if (!user) throw new UnauthorizedException({ message: 'Пароль или email не подходит' });
      const passEquals = await bcrypt.compare(userDto.password, user.password);
      
      if (user && passEquals) return user;
      
      throw new UnauthorizedException({ message: 'Пароль или email не подходит'});
    } catch(e) {
      throw new UnauthorizedException({message: e.message})
    }

  }
}
