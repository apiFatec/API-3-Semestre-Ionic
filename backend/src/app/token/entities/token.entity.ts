import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'token_user' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  hash: string;

  @Column({name: 'user_name'})
  userName: string;
}