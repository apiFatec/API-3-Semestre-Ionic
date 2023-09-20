import { api } from "@/api";

class UserServices {

  async Login(data: { username: string, password: string }) {
    console.log(data);
    return await api.post('/users/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default new UserServices();