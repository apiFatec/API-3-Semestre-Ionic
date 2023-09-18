import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesEntity } from './entities/processes.entity';
import { UsersProcessesEntity } from './entities/usersProcesses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessesEntity, UsersProcessesEntity])],
})
export class ProcessesModule { }
