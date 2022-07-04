import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

import { User } from 'src/models/user.model';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByName('User');
    await user.$set('roles', [role.id]);
    await user.save();
    user.setDataValue('roles', [role]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
    return user;
  }

  async getUserByEMail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: {all: true} });
    return user;
  }

  async updateUser(id: number, opts: UpdateUserDto) {
    const updUser = await this.userRepository.update(opts, { where: { id } });
    return updUser;
  }

  async deleteUser(id: string) {
    const num = await this.userRepository.destroy({ where: { id } });
    return num;
  }

}
