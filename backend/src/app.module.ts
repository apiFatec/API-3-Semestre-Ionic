import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UsuariosModule } from './app/users/users.module';
import { UsersEntity } from './app/users/entities/users.entity';
import { TokenModule } from './app/token/token.module';
import { ProcessesModule } from './app/processes/processes.module';
import { TasksModule } from './app/tasks/tasks.module';
import { ProjectsModule } from './app/projects/projects.module';
import { FilesModule } from './app/files/files.module';
import { TeamsModule } from './app/teams/teams.module';
import { IsosModule } from './app/isos/isos.module';
import { MailModule } from './app/mail/mail.module';
import { ComentariosModule } from './app/comentarios/comentarios.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationModule } from './app/notification/notification.module';

require('dotenv').config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure : false,
        port : process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        ignoreTLS: true
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      port: Number(process.env.TYPEORM_PORT),
      host: process.env.TYPEORM_HOST,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsuariosModule,
    TokenModule,
    ProcessesModule,
    TasksModule,
    ProjectsModule,
    FilesModule,
    TeamsModule,
    IsosModule,
    MailModule,
    ComentariosModule,
    NotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
