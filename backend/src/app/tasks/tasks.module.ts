import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { UsersTasksEntity } from './entities/usersTasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, UsersTasksEntity])]
})
export class TasksModule {}
