import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  private logger = new Logger('TaskController');
  // Declaring as private makes it equivalent of this.taskService
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() searchDto: SearchTaskDto,
    @GetUser() user: User,
  ): Promise<TaskEntity[]> {
    this.logger.log(
      `User: ${user.username}, retrieving all tasks with ${JSON.stringify(
        searchDto,
      )}`,
    );
    // if search criteria available in query param
    return this.taskService.getTasks(searchDto, user);
  }

  @Get('/:id')
  getTaskbyId(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  // Implementation with DTO
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto, user);
  }

  // // Implementation without DTO
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Task {
  // //   return this.taskService.createTask(title, description);
  // // }

  @Delete('/:id')
  deleteTaskbyId(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.taskService.updateTaskStatus(id, taskStatusDto.status, user);
  }
}
