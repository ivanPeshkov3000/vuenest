import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from 'src/models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: Repository<Role>) {}
  createRole(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }
  async getAllRoles() {
    const users = await this.roleRepository.findAll();
    return users;
  }

  async getRoleByName(name: string) {
    const user = await this.roleRepository.findOne({ where: { name } });
    return user;
  }

  async updateRole(id: number, opts: UpdateRoleDto) {
    const user = await this.roleRepository.update(opts, { where: { id } })
    return user;
  }

  async deleteRole(id: number) {
    const num = await this.roleRepository.destroy({ where: { id } })
    return num;
  }
}
