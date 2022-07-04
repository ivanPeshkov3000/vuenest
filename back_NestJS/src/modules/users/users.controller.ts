import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RoleAuthGuard } from '../auth/role_auth.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @Roles('Admin')
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Получить пользователя по email' })
  @Roles('Admin')
  @Get('/email/:email')
  getUserByEMail(@Param('email') email: string) {
    return this.usersService.getUserByEMail(email);
  }

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Добавление юзера',
  })
  @Roles('Admin')
  @Post()
  createUser(@Body() createDto: CreateUserDto) {
    return this.usersService.createUser(createDto);
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @Roles('Admin')
  @Patch(':id')
  updUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Roles('Admin')
  @Delete(':id')
  async delUser(@Param('id') id: string) {
    const val = await this.usersService.deleteUser(id);
    return val ? 'Deleted' : 'Not found';
  }
}
