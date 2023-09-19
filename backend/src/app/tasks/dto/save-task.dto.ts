import { Status } from '../entities/tasks.entity';

export class SaveTaskDTO {
  title: string;
  description: string;
  status: Status;
}
