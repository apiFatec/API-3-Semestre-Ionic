import { Tasks } from "./tasks";
import { Teams } from "./teams";

export interface Processes {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  deadline: string | undefined;
  tasks: Array<Tasks> | undefined;
  team: Teams
}
