import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { UsersTasksEntity } from './entities/usersTasks.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, UsersTasksEntity])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
