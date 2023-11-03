import { Users } from "./users";

export interface Teams {
  id: string;
  name: string;
  leader: Users;
  users: Array<Users>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
