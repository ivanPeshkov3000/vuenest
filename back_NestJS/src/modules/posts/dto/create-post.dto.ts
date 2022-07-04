import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiPropertyOptional()
  url?: string

}
