import { Module } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsuariosController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../helpers/multer.config';
import { TokenModule } from '../token/token.module';
import { TeamsModule } from '../teams/teams.module';


@Module({
  imports: [
    TokenModule,
    AuthModule,
    TeamsModule,
    TypeOrmModule.forFeature([UsersEntity]),
    MulterModule.register(multerConfig),
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule { }
