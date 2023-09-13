import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
require('dotenv').config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    port: Number(process.env.TYPEORM_PORT),
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [__dirname + '/*/*/.entity{.ts,.js}'],
    synchronize: false
  } as TypeOrmModuleOptions),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
