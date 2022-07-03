import { REQUEST } from '@nestjs/core';
import { Inject, Injectable, Scope, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto, ListTasksDto } from './task.dto';
import { Task } from './task.entity';

@Injectable({ scope: Scope.REQUEST })
export class TasksService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const { title, isDone } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.isDone = isDone;
    task.user = (this.request as any).user;
    return this.tasksRepository.save(task);
  }

  async findAll(listTasksDto: ListTasksDto) {
    const where: Record<string, any> = {};
    where.user = (this.request as any).user;
    if (listTasksDto.date) {
      where.createTime = Like(`%${listTasksDto.date}%`);
    }
    const { page, size } = listTasksDto;
    const [taskList, total] = await this.tasksRepository
      .createQueryBuilder()
      .where(where)
      .offset((page - 1) * size)
      .limit(size)
      .getManyAndCount();
    return { data: taskList, total };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneOrFail({ where: { id } });
    return this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
