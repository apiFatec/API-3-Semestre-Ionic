import { TasksEntity } from '@/app/tasks/entities/tasks.entity';

export class SaveProcessDTO {
  name: string;
  description: string;
  deadline: string;
  tasks: Array<TasksEntity>;
}
