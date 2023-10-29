import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { UsersProcessesEntity } from "@/app/processes/entities/usersProcesses.entity";
import { UsersTasksEntity } from "@/app/tasks/entities/usersTasks.entity";
import { ProjectsEntity } from "@/app/projects/entities/projects.entity";
import { File } from "@/app/files/entities/file.entity";
import { TasksEntity } from '@/app/tasks/entities/tasks.entity';
import { TeamsEntity } from '@/app/teams/entities/teams.entity';

export enum Role {
  CLEVEL = 'C-Level',
  MANAGER = 'Gestor',
  LEADER = 'Lider',
  DEVELOPER = 'Desenvolvedor',
  ADMIN = 'Admin',
}
@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  adress: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  birthdate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => UsersProcessesEntity, (usersProcessesEntity) => usersProcessesEntity.usersId)
  usersProcesses: UsersProcessesEntity[];

  @OneToMany(() => UsersTasksEntity, (usersTasksEntity) => usersTasksEntity.usersId)
  usersTasks: UsersTasksEntity[];

  @OneToMany(() => ProjectsEntity, (projectsEntity) => projectsEntity.usersId)
  projects: ProjectsEntity[];

  @OneToMany(() => File, (file) => file.usersId)
  files: File[];

  @ManyToOne(() => TeamsEntity, (teamsEntity) => teamsEntity.users)
  @JoinColumn({ name: 'teams_id' })
  teams: TeamsEntity;
}

