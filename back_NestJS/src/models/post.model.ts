import { Model, Table, Column, DataType, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { UserPost } from './user_post.model';

interface PostCreationAttrs {
  title: string;
  content: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '/hello_world', description: 'Локальный адрес поста' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  uri: string;

  @ApiProperty({ example: '1.01.1997', description: 'Дата поста' })
  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @ApiProperty({ example: 'Привет мир!', description: 'Заголовок поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '/static/md/hello_world.md', description: 'Локальная ссылка на md-файл поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ description: 'Авторы поста' })
  @BelongsToMany(() => User, () => UserPost)
  author: User[];
}