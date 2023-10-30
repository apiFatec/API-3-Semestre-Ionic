import { UsersEntity } from '@/app/users/entities/users.entity';

export class SaveTeamDTO {
  name: string;
  users: Array<UsersEntity>;
  leader: UsersEntity;
}
