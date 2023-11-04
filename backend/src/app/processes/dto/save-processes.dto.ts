import { TasksEntity } from '@/app/tasks/entities/tasks.entity';
import { TeamsEntity } from '@/app/teams/entities/teams.entity';
import { UsersEntity } from '@/app/users/entities/users.entity';

export enum Status {
  WAITING = 'Aguardando',
  INPROGRESS = 'Em progresso',
  FINISHED = 'Finalizado',
}
export class SaveProcessDTO {
  name: string;
  description: string;
  deadline: string;
  tasks: Array<TasksEntity>;
  status: Status | undefined;
  leader: UsersEntity;
  team: TeamsEntity;
}
