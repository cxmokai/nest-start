import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  readonly isActive: boolean;
}

export class ListUsersDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;

  @Transform(({ value }) => +value)
  @IsInt()
  readonly page: number;

  @Transform(({ value }) => +value)
  @IsInt()
  readonly size: number;
}
