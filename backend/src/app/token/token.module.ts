import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { AuthModule } from '../auth/auth.module';
import { UsuariosModule } from '../users/users.module';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsuariosModule),
    JwtModule
  ],
  controllers: [TokenController],
  exports: [TokenService],
  providers: [TokenService]
})
export class TokenModule { }
