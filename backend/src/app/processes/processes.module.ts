import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesEntity } from './entities/processes.entity';
import { UsersProcessesEntity } from './entities/usersProcesses.entity';
import { ProcessesController } from './processes.controller';
import { ProcessesService } from './processes.service';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessesEntity, UsersProcessesEntity]),
    TasksModule,
  ],
  controllers: [ProcessesController],
  providers: [ProcessesService],
  exports: [ProcessesService],
})
export class ProcessesModule {}
