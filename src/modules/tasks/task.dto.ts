import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateTaskDto {
  readonly title: string;
  readonly isDone: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class ListTasksDto {
  @IsDateString()
  @IsOptional()
  readonly date?: string;

  @Transform(({ value }) => +value)
  @IsInt()
  readonly page: number;

  @Transform(({ value }) => +value)
  @IsInt()
  readonly size: number;
}
