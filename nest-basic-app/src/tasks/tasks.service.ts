import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

// Used for creating unique task identity
import { v4 as uuidv4 } from 'uuid';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // default methods are of type public
  getAllTasks(): Task[] {
    return this.tasks;
  }

  searchTasks(searchDto: SearchTaskDto): Task[] {
    const { searchTerm, taskStatus } = searchDto;

    // if search term entered
    if (searchTerm) {
      this.tasks = this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm),
      );
    } else if (taskStatus) {
      this.tasks = this.tasks.filter((task) => task.status === taskStatus);
    }
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id != id);
    // Use splice() as alternative aproach
    // this.tasks.splice(
    //   this.tasks.indexOf(this.tasks.find((task) => task.id === id)),
    //   1,
    // );
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
    const task = this.tasks.find((task) => task.id === id);
    task.status = taskStatus;
    return task;
  }
}
