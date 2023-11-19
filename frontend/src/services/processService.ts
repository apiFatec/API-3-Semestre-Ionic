import { api } from "@/api";
import { ProcessFormValues } from "@/interfaces/processFormValues";

class ProcessServices {
  async getAll(id: string | undefined) {
    return await api.get(`/processes/user/team/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async createProcess(data: ProcessFormValues) {
    return await api.post("/processes", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getOne(id: string) {
    return await api.get(`/processes/${id}`);
  }
  async deleteTask(id: string) {
    return await api.delete(`/tasks/${id}`);
  }

  async getAllToTeam(id: string | undefined) {
    return await api.get(`/processes/team/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async getIsos(id : string | undefined){
    return await api.get(`/processes/${id}/isos`)
  }
} 

export default new ProcessServices();
