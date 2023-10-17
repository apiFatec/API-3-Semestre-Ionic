import { TasksEntity } from '@/app/tasks/entities/tasks.entity';
import { UsersEntity } from '@/app/users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ nullable: false })
  contentLength: number;

  @Column({ nullable: false })
  contentType: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => TasksEntity, (tasksEntity) => tasksEntity.files)
  taskId: string;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.files)
  usersId: string;
}