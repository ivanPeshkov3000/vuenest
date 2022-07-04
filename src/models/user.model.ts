import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.model';
import { UserRole } from './user_roles.model';
import { Post } from './post.model';
import { UserPost } from './user_post.model';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'ivan@mail.org', description: 'Почтовый ящик' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '*******', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ description: 'Роль пользователя' })
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @ApiProperty({ description: 'Посты пользователя' })
  @BelongsToMany(() => Post, () => UserPost)
  posts: Post[];
}