import { api } from "@/api";
import { TeamFormValues } from "@/interfaces/teamFormValues";

class TeamsService {
  async getAll() {
    return await api.get('/teams', {
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  async getOne(id: string  | undefined) {
    return await api.get(`/teams/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  async getUserTeams(id: string) {
    return await api.get(`/teams/user/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  
  async createTeam(data: TeamFormValues) {
    return await api.post("/teams", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new TeamsService();