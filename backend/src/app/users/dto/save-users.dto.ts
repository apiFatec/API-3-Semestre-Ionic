import { TeamsEntity } from "@/app/teams/entities/teams.entity";
import { IsEmail, IsNotEmpty } from "class-validator";

export enum Role {
  CLEVEL = "C-Level",
  MANAGER = "Gestor",
  LEADER = "Lider",
  DEVELOPER = "Desenvolvedor",
  ADMIN = "Admin"
}

export class SaveUserDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  role: Role;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthdate: Date;

  teams: TeamsEntity;
}