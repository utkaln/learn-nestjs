import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

import { SearchTaskDto } from './dto/search-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    // first create a database acceptable object before calling actual db insert
    const task = this.taskRepository.create({
      title,
      description,
      taskStatus: TaskStatus.CREATED,
    });

    // this is actual db call to create record, and it is async
    await this.taskRepository.save(task);
    return task;
  }

  // call db to fetch task by id
  // all db calls are async
  async getTaskById(id: string): Promise<TaskEntity> {
    const resultSet = await this.taskRepository.findOneBy({ id });
    if (!resultSet) {
      throw new NotFoundException(`No task found with id: ${id}`);
    }
    return resultSet;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`No task found with id: ${id}`);
    }
  }

  async updateTaskStatus(
    id: string,
    taskStatus: TaskStatus,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.taskStatus = taskStatus;
    await this.taskRepository.save(task);
    return task;
  }

  getTasks(searchDto: SearchTaskDto): Promise<TaskEntity[]> {
    const { searchTerm, taskStatus } = searchDto;
    // if search term entered
    const task: TaskEntity = null;
    return null;
  }
}
