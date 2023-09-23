import { api } from "@/api";
import axios from "axios";

class UserServices {

  async Login(data: { username: string, password: string }) {
    return await api.post('/users/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getProcess(){
    return await axios.get('https://raw.githubusercontent.com/apiFatec/API-3-Semestre-Ionic/main/fakeProcess.json')
  }
}

export default new UserServices();