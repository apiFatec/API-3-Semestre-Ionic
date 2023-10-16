import { Tasks } from "./tasks";
import { Users } from "./users";

export interface ProcessFormValues {
  name: string;
  description: string;
  deadline: Date;
  leader: string;
  team: Array<Users>;
  tasks: Array<Tasks>;
}
