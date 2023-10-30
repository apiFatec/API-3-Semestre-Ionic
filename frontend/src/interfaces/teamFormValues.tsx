import { Users } from "./users";

export interface TeamFormValues {
  name: string;
  leader: string;
  users: Array<Users>;
}
