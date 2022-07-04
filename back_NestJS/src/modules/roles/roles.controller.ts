import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleAuthGuard } from '../auth/role_auth.guard';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Roles')
@Roles('Admin')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать новую роль' })
  @ApiBody({
    type: CreateRoleDto
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Вернуть все роли' })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Найти роль по имени' })
  @Get(':name')
  getRoleByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @ApiOperation({ summary: 'Обновить данные роли' })
  @Patch(':id')
  updRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Удалить роль' })
  @Delete(':id')
  delRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(+id);
  }
}
