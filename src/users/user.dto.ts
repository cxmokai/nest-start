import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  // @IsString()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  readonly isActive: boolean;
}

export class ListUsersDto {
  @IsString()
  readonly username?: string;
  @IsBoolean()
  readonly isActive?: boolean;
  @IsInt()
  readonly page: number;
  @IsInt()
  readonly size: number;
}
