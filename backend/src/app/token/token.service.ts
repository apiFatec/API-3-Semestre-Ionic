import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { UsuariosService } from 'src/app/users/users.service';
import { AuthService } from '@/app/auth/auth.service';
import { TokenReturn } from './dto/return-token.dto';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly userService: UsuariosService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async saveToken(hash: string, username: string): Promise<void> {
    const existToken = await this.tokenRepository.findOne({ where: { userName: username } });
    if (existToken) {
      this.tokenRepository.update(existToken.id, { hash: hash, userName: username });
    } else {
      const token = this.tokenRepository.create({
        hash: hash,
        userName: username
      })

      this.tokenRepository.insert(token);
    }
  }

  async refreshToken(oldToken: string): Promise<TokenReturn | HttpException> {
    const hasToken = await this.tokenRepository.findOne({ where: { hash: oldToken } });
    if (hasToken) {
      let user = await this.userService.findOne(hasToken.userName);
      return this.authService.login(user);
    } else {
      return new HttpException({
        message: "Token invalido",
      }, HttpStatus.UNAUTHORIZED)
    }
  }

}