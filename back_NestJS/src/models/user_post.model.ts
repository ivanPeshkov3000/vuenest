import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.model';
import { User } from './user.model';

@Table({ tableName: 'user_post' })
export class UserPost extends Model<UserPost> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Id поста' })
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  post_id: number;

  @ApiProperty({ description: 'Id пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
}