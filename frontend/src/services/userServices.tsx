import { api } from "@/api";
import { TeamFormValues } from "@/interfaces/teamFormValues";
import axios from "axios";

class UserServices {
  async Login(data: { username: string; password: string }) {
    return await api.post("/users/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getUser() {
    return await api.get("/users");
  }

  async CreateUser(data: any) {
    return await api.post("/users", data, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async joinTask(data: any) {
    return await api.post("/tasks/join-task", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getTeamMembers(id: string) {
    return await api.get(`/teams/${id}`);
  }

  async createTeam(data: TeamFormValues) {
    return await api.post("/teams", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async finishTask(id: string | undefined) {
    return await api.put(`/tasks/finish-task/${id}`);
  }

  async leaveTask(idTask: string | undefined, tokenUser: string | null) {
    return await api.delete(`tasks/leave-task/${idTask}/user/${tokenUser}`);
  }

  async getOneUser(tokenUser : string | null){
    return await api.get(`/users/${tokenUser}`)
  }
}

export default new UserServices();
