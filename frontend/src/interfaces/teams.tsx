import { Users } from "./users";

export interface Teams {
  id: string;
  name: string;
  leader: string;
  users: Array<Users>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
