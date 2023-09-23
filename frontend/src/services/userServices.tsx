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
  
  async CreateUser(data: any) {
    return await api.post('/users', data, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }
}

export default new UserServices();