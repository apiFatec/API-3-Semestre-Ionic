import { Tasks } from "./tasks";
import { Teams } from "./teams";
import { Users } from "./users";

export interface Processes {
  id: string;
  name: string;
  description: string;
  deadline: string;
  tasks: Array<Tasks>;
  team: Teams;
}
