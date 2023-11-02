import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersProcessesEntity } from './usersProcesses.entity';
import { TasksEntity } from '@/app/tasks/entities/tasks.entity';
import { TeamsEntity } from '@/app/teams/entities/teams.entity';

export enum Status {
  WAITING = 'Aguardando',
  INPROGRESS = 'Em progresso',
  FINISHED = 'Finalizado',
}

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

  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.WAITING,
  })
  status: Status;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => UsersProcessesEntity,
    (usersProcessesEntity) => usersProcessesEntity.processesId,
  )
  usersProcesses: UsersProcessesEntity[];

  @OneToMany(() => TasksEntity, (tasksEntity) => tasksEntity.processesId)
  tasks: TasksEntity[];

  @ManyToOne(() => TeamsEntity, (teamsEntity) => teamsEntity.processes)
  team: TeamsEntity;
}
