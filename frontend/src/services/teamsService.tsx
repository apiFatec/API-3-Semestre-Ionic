import { api } from "@/api";
import { TeamFormValues } from "@/interfaces/teamFormValues";

class TeamsService {
  async getAll() {
    return await api.get("/teams", {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getOne(id: string) {
    return await api.get(`/teams/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getUserTeams(id: string) {
    return await api.get(`/teams/user/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  async createTeam(data: TeamFormValues) {
    return await api.post("/teams", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateTeam(id: string, data: TeamFormValues | null) {
    console.log(id, data);
    return await api.put(`/teams/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new TeamsService();
