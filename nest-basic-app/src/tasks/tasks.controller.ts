import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  // Declaring as private makes it equivalent of this.taskService
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  // Implementation with DTO
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  // Implementation without DTO
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.taskService.createTask(title, description);
  // }

  @Delete('/:id')
  deleteTaskbyId(@Param('id') id: string): void {
    this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') taskStatus: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, taskStatus);
  }
}
