import { Users } from "./users";

export interface Process {
  process_id: string;
  process_name: string;
  process_description: string;
  process_deadline: Date;
  process_status: string;
  users: Array<Users>;
  tasks: {status : string}[]
}
