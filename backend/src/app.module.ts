import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UsuariosModule } from './app/usuarios/usuarios.module';
import { UsuariosEntity } from './app/usuarios/entities/usuarios.entity';
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
  } as TypeOrmModuleOptions), AuthModule, UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
