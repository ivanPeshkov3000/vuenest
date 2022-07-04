import { ApiProperty } from '@nestjs/swagger';
export class NewPostDto {
  @ApiProperty()
  url: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  author: string

}