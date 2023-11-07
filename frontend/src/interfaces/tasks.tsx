import { Users } from "./users";

export interface Tasks {
  id : string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: any;
  users: Users[]
}
