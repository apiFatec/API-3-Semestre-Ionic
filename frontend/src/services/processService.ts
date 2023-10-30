import { api } from "@/api";
import { ProcessFormValues } from "@/interfaces/processFormValues";

class ProcessServices {

  async getAll() {
    return await api.get('/processes');
  }

  async createProcess(data: ProcessFormValues) {
    console.log(data);
    return await api.post('/processes', data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async getOne(id: string) {
    return await api.get(`/processes/${id}`)
  }

  async getAllToTeam(id: string) {
    return await api.get(`/processes/team/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }
}

export default new ProcessServices();