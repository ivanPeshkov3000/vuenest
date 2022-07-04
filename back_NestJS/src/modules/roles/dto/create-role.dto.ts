import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rights: [string];

  @ApiProperty()
  readonly scope: [string];

  @ApiProperty()
  readonly desc?: string;
}
