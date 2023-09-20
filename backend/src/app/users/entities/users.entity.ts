import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { UsersProcessesEntity } from "@/app/processes/entities/usersProcesses.entity";
import { UsersTasksEntity } from "@/app/tasks/entities/usersTasks.entity";
import { ProjectsEntity } from "@/app/projects/entities/projects.entity";

export enum Role {
  CLEVEL = "C-Level",
  MANAGER = "Gestor",
  LEADER = "Lider",
  DEVELOPER = "Desenvolvedor"
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }

  @OneToMany(() => UsersProcessesEntity, (usersProcessesEntity) => usersProcessesEntity.usersId)
  usersProcesses: UsersProcessesEntity;

  @OneToMany(() => UsersTasksEntity, (usersTasksEntity) => usersTasksEntity.usersId)
  usersTasks: UsersTasksEntity;

  @OneToMany(() => ProjectsEntity, (projectsEntity) => projectsEntity.usersId)
  projects: ProjectsEntity;
}