import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsersProcessesEntity } from "./usersProcesses.entity";
import { TasksEntity } from "@/app/tasks/entities/tasks.entity";

@Entity({ name: 'processes' })
export class ProcessesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'timestamp' })
  deadline: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => UsersProcessesEntity, (usersProcessesEntity) => usersProcessesEntity.processesId)
  usersProcesses: UsersProcessesEntity;

  @OneToMany(() => TasksEntity, (tasksEntity) => tasksEntity.processesId)
  tasks: TasksEntity;
}