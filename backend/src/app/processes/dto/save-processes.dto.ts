import { TasksEntity } from '@/app/tasks/entities/tasks.entity';

export enum Status {
  WAITING = "Aguardando",
  INPROGRESS = "Em progresso",
  FINISHED = "Finalizado"
}
export class SaveProcessDTO {
  name: string;
  description: string;
  deadline: string;
  tasks: Array<TasksEntity>;
  status: Status;
}
