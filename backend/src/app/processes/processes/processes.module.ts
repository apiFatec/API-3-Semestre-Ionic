import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesEntity } from './entities/processes.entity';
import { UsersProcessesEntity } from './entities/usersProcesses.entity';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessesEntity, UsersProcessesEntity]),
    TasksModule,
  ],
  providers: [ProcessesService],
  controllers: [ProcessesController],
})
export class ProcessesModule {}
