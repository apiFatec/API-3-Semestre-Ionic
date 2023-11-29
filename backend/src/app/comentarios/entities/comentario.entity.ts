import { TasksEntity } from "@/app/tasks/entities/tasks.entity";
import { UsersEntity } from "@/app/users/entities/users.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'comentarios'})
export class Comentario {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    comentario : string

    @ManyToOne(() => UsersEntity, (user) => user.comentario)
    user : string

    @ManyToOne(() => TasksEntity, (task) => task.comentario)
    task : string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
  
}
