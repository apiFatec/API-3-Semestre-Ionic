import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesEntity } from './entities/processes.entity';
import { UsersProcessesEntity } from './entities/usersProcesses.entity';
import { ProcessesController } from './processes.controllers';
import { ProcessesService } from './processes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessesEntity, UsersProcessesEntity])],
  controllers: [ProcessesController],
  providers: [ProcessesService],
  exports: [ProcessesService]
})
export class ProcessesModule { }
