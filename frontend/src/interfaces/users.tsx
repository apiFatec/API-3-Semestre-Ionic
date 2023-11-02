import { Teams } from "./teams";

export interface Users {
  adress: string,
  name: string,
  email: string,
  role: string,
  profileImage: string,
  birthdate: string,
  deletedAt: string,
  createdAt: string,
  gender: string,
  id: string,
  files: string,
  phone: string,
  updatedAt: string,
  teams: Teams;
}
