import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, ListTasksDto, UpdateTaskDto } from './task.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * 创建任务
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  /**
   * 任务列表
   */
  @Get()
  findAll(@Query() listTasksDto: ListTasksDto) {
    return this.tasksService.findAll(listTasksDto);
  }

  /**
   * 更新任务
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  /**
   * 删除任务
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
