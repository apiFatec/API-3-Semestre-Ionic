import { Users } from "./users";

export interface Process {
  processId: string;
  processName: string;
  processDescription: string;
  processDeadline: string;
  processStatus: string;
  users: Array<Users>;
  tasks: {status : string}[]
}
