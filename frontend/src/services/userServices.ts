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
    return await api.get(`/users/one/${id}`)
  }

  async sendPicture(userName: string | null, id: string | null, data: FormData) {
    return await api.post(`/users/profile/${userName}/${id}`, data)
  }

  async removeFromTeam(id: string) {
    return await api.delete(`users/remove-team/${id}`);
  }

  async getUserToTeam() {
    return await api.get("/users/users-team", {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

}

export default new UserServices();
