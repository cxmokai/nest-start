import { ApiProperty } from '@nestjs/swagger';

export class ListUsersDto {
  @ApiProperty()
  readonly username?: string;
  @ApiProperty()
  readonly isActive?: boolean;
  @ApiProperty()
  readonly page: number;
  @ApiProperty()
  readonly size: number;
}
