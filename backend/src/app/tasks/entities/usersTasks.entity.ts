import { UsersEntity } from "@/app/users/entities/users.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./tasks.entity";

@Entity({ name: 'users_tasks' })
export class UsersTasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.usersTasks)
  @JoinColumn({name: 'users_id'})
  usersId: UsersEntity;

  @ManyToOne(() => TasksEntity, (tasksEntity) => tasksEntity.usersTasks)
  @JoinColumn({name: 'tasks_id'})
  tasksId: TasksEntity;
}