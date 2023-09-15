import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';

@Entity({name: 'usuarios'})
export class UsuariosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: string;
  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10)
  }

}