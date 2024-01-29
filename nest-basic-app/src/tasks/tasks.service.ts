import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

import { SearchTaskDto } from './dto/search-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TaskService');
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    // first create a database acceptable object before calling actual db insert
    const task = this.taskRepository.create({
      title,
      description,
      taskStatus: TaskStatus.CREATED,
      user,
    });

    // this is actual db call to create record, and it is async
    await this.taskRepository.save(task);
    return task;
  }

  // call db to fetch task by id
  // all db calls are async
  async getTaskById(id: string, user: User): Promise<TaskEntity> {
    const resultSet = await this.taskRepository.findOneBy({ id, user });
    if (!resultSet) {
      throw new NotFoundException(`No task found with id: ${id}`);
    }
    return resultSet;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException(`No task found with id: ${id}`);
    }
  }

  async updateTaskStatus(
    id: string,
    taskStatus: TaskStatus,
    user: User,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);
    task.taskStatus = taskStatus;
    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(searchDto: SearchTaskDto, user: User): Promise<TaskEntity[]> {
    const { searchTerm, taskStatus } = searchDto;
    // if search term entered
    const taskQuery = this.taskRepository.createQueryBuilder('task_entity');
    taskQuery.andWhere({ user });
    if (taskStatus) {
      taskQuery.andWhere('task_entity.taskStatus = :taskStatus', {
        taskStatus,
      });
    }
    if (searchTerm) {
      taskQuery.andWhere(
        '(LOWER(task_entity.title) LIKE LOWER(:searchTerm) OR LOWER(task_entity.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` },
      );
    }
    try {
      return await taskQuery.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user: ${
          user.username
        } with data: ${JSON.stringify(searchDto)}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
