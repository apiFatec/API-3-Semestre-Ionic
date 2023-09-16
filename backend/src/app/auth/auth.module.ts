import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from '../token/token.module';
require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    TokenModule,
    forwardRef(() => UsuariosModule),
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '30s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService]
})
export class AuthModule { }
