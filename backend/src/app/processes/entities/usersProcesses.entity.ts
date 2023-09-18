import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProcessesEntity } from "./processes.entity";
import { UsersEntity } from "@/app/users/entities/users.entity";

export enum Role {
  MANAGER = "gestor",
  LEADER = "lider",
  DEVELOPER = "desenvolvedor"
}

@Entity({name: 'users_processes'})
export class UsersProcessesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'enum', enum: Role})
  role: Role;

  @ManyToOne(() => ProcessesEntity, (processesEntity) => processesEntity.usersProcesses)
  @JoinColumn({name: 'processes_id'})
  processesId: ProcessesEntity;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.usersProcesses)
  @JoinColumn({name: 'users_id'})
  usersId: UsersEntity;

}