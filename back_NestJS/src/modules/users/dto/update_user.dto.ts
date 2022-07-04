import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  readonly password?: string;
}