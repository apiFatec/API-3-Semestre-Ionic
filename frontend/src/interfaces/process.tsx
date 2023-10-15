import { Users } from "./users";

export interface Process {
  process_id: string;
  process_name: string;
  process_description: string;
  process_deadline: string;
  process_status: string;
  users: Array<Users>;
}
