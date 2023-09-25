import { api } from "@/api";

class ProcessServices {

  async getAll() {
    return await api.get('/processes')
  }
}

export default new ProcessServices();