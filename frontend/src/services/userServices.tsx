import { api } from "@/api";

class UserServices {

  async Login(data: { username: string, password: string }) {
    return await api.post('/users/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getUser() {
    return await api.get('/users')
  }
}

export default new UserServices();