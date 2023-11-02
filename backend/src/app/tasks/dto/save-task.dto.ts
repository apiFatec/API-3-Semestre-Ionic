import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { Priority, Status } from '../entities/tasks.entity';

export class SaveTaskDTO {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}
