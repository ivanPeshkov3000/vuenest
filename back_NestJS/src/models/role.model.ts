import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { UserRole } from './user_roles.model';

interface RoleCreationAttrs {
  name: string;
  desc: string;
}

@Table({ tableName: 'roles1', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    enum: ['Admin', 'Moderator', 'User'],
    description: 'Название роли',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING })
  desc: string;

  @ApiProperty({ enum: ['r', 'w', 'rw'], description: 'Права роли' })
  @Column({ type: DataType.ENUM('r', 'w', 'rw') })
  rights: string[];

  @ApiProperty({ description: 'Область роли' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  scope: string[];


  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}