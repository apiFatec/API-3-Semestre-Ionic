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
  adress: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthdate: Date;
}