import { api } from "@/api";

class UserServices {

  async Login(data: { username: string, password: string }) {
    return await api.post('/users/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default new UserServices();