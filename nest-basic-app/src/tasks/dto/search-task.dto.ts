import { TaskStatus } from '../task.model';

export class SearchTaskDto {
  searchTerm: string;
  taskStatus: TaskStatus;
}
