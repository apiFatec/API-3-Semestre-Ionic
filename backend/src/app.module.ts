import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UsuariosModule } from './app/users/users.module';
import { UsersEntity } from './app/users/entities/users.entity';
import { TokenModule } from './app/token/token.module';
require('dotenv').config()
@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    port: Number(process.env.TYPEORM_PORT),
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  } as TypeOrmModuleOptions),
    UsuariosModule,
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
