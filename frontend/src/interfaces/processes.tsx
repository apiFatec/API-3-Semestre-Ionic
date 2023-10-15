import { Tasks } from "./tasks";

export interface Processes {
  id: string | undefined;
  deadline: string | undefined;
  tasks: Array<Tasks> | undefined;
  name: string | undefined;
  description: string | undefined;
}
