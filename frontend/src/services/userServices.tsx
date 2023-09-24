import { api } from "@/api";
import axios from "axios";

class UserServices {

  async Login(data: { username: string, password: string }) {
    return await api.post('/users/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getUser() {
    return await api.get('/users')
  }

  async CreateUser(data: any) {
    return await api.post('/users', data, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async joinTask(data: any) {
    return await api.post('/tasks/join-task', data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

export default new UserServices();