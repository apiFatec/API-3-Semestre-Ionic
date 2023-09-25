import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { UsersTasksEntity } from './entities/usersTasks.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';
import { UsuariosModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, UsersTasksEntity]), TokenModule, UsuariosModule],
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule { }
