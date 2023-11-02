import { api } from "@/api";

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

  async finishTask(id: string | undefined) {
    return await api.put(`/tasks/finish-task/${id}`);
  }

  async leaveTask(idTask: string | undefined, id: string | null) {
    return await api.delete(`tasks/leave-task/${idTask}/user/${id}`);
  }

  async getOneUser(id: string) {
    return await api.get(`/users/${id}`)
  }

  async removeFromTeam(id: string) {
    return await api.delete(`users/remove-team/${id}`);
  }
}

export default new UserServices();
