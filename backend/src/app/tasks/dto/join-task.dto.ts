import { UsersEntity } from "@/app/users/entities/users.entity";
import { TasksEntity } from "../entities/tasks.entity";

export class JoinTaskDto {
  user: { token: string };
  task: TasksEntity;
}