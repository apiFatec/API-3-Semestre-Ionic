import { TeamsEntity } from "@/app/teams/entities/teams.entity";

export interface LoginReturn {
  access_token: string;
  name: string;
  role: string;
  email: string;
  id: string;
  team: string;
}