import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.model';
import { User } from './user.model';

@Table({ tableName: 'user_roles' })
export class UserRole extends Model<UserRole> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Id роли' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: number;

  @ApiProperty({ description: 'Id пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
}