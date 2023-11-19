import { typeIso } from "./iso";
import { Tasks } from "./tasks";
import { Teams } from "./teams";
import { Users } from "./users";

export interface ProcessFormValues {
  name: string;
  description: string;
  deadline: Date;
  leader: Users;
  team: Teams;
  tasks: Array<Tasks>;
  isos : Array<typeIso>
}
