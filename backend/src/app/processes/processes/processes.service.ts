import { Repository } from 'typeorm';
import { SaveProcessDTO } from './dto/save-processes.dto';
import { ProcessesEntity } from './entities/processes.entity';
import { TasksService } from '../tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessesService {
  constructor(
    @InjectRepository(ProcessesEntity)
    private readonly processesRepository: Repository<ProcessesEntity>,
    private readonly tasksService: TasksService,
  ) {}

  async store(data: SaveProcessDTO): Promise<ProcessesEntity> {
    const { tasks, ...result } = data;

    const process = this.processesRepository.create(result);

    await this.processesRepository.save(process);

    if (tasks && tasks.length > 0) {
      const taskEntities = await this.tasksService.storeMultiple(tasks);

      taskEntities.forEach((task) => {
        task.process = process;
      });

      await this.tasksService.saveMultiple(taskEntities);
    }

    return process;
  }
}
