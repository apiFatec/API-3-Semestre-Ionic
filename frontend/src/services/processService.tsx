import { api } from "@/api";
import { ProcessFormValues } from "@/pages/cadastroProcesso/cadastroProcesso";
import { Process } from "@/pages/home/home";

class ProcessServices {

  async getAll() {
    return await api.get('/processes');
  }

  async createProcess(data: ProcessFormValues) {
    return await api.post('/processes', data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async getOne(id: string) {
    return await api.get(`/processes/${id}`)
  }
}

export default new ProcessServices();