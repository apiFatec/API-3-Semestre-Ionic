import { ProcessesEntity } from '@/app/processes/entities/processes.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersTasksEntity } from './usersTasks.entity';
import { File } from '@/app/files/entities/file.entity';

export enum Status {
  WAITING = 'Aguardando',
  FINISHED = 'Finalizado',
  INPROGRESS = 'Em progresso',
  LATE = 'Atrasado',
}

export enum Priority {
  LOW = "Baixa",
  MEDIUM = "Média",
  HIGH = "Alta",
}

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'enum', enum: Status, default: Status.WAITING, })
  status: Status;

  @Column({ nullable: false, type: 'enum', enum: Priority, default: Priority.LOW })
  priority: Priority;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => ProcessesEntity, (processesEntity) => processesEntity.tasks)
  @JoinColumn({ name: 'processes_id' })
  processesId: ProcessesEntity;

  @OneToMany(() => UsersTasksEntity, (usersTasksEntity) => usersTasksEntity.tasksId)
  usersTasks: UsersTasksEntity[];

  @OneToMany(() => File, (file) => file )
  files: File[];
}
