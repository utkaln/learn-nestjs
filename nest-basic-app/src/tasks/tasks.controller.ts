import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Controller('tasks')
export class TasksController {
  // Declaring as private makes it equivalent of this.taskService
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() searchDto: SearchTaskDto): Task[] {
    // if search criteria available in query param
    if (Object.keys(searchDto).length) {
      return this.taskService.searchTasks(searchDto);
    } else {
      // if no search term in query param
      return this.taskService.getAllTasks();
    }
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
