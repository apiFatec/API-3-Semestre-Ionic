import { Tasks } from "./tasks";
import { Teams } from "./teams";

export interface ProcessFormValues {
  name: string;
  description: string;
  deadline: Date;
  leader: string;
  team: Teams;
  tasks: Array<Tasks>;
}
