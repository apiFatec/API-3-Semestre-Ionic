import { Injectable, Inject } from '@nestjs/common';
import { UsuariosService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login-user.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { TokenReturn } from '../token/dto/return-token.dto';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: UsersEntity = await this.usuariosService.findOneLogin(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UsersEntity): Promise<TokenReturn> {
    const body = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(body);
    this.tokenService.saveToken(token, user.email)
    return {
      access_token: token,
    };
  }
}
