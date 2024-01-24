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
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  // Declaring as private makes it equivalent of this.taskService
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() searchDto: SearchTaskDto): Promise<TaskEntity[]> {
    // if search criteria available in query param
    return this.taskService.getTasks(searchDto);
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  // Implementation with DTO
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }

  // // Implementation without DTO
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Task {
  // //   return this.taskService.createTask(title, description);
  // // }

  @Delete('/:id')
  deleteTaskbyId(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    return this.taskService.updateTaskStatus(id, taskStatusDto.status);
  }
}
