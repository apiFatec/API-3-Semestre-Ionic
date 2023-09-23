import { TasksEntity } from '@/app/tasks/entities/tasks.entity';
import { UsersEntity } from '@/app/users/entities/users.entity';

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
  status: Status | undefined;
  team: Array<UsersEntity>;
  leader: UsersEntity;
}
