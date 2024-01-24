import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class SearchTaskDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  taskStatus?: TaskStatus;
}
