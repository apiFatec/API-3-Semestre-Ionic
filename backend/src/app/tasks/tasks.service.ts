import { Injectable } from '@nestjs/common';
import { Status, TasksEntity } from './entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveTaskDTO } from './dto/save-task.dto';
import { ProcessesEntity } from '../processes/entities/processes.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) { }

  async store(data: SaveTaskDTO[], process: ProcessesEntity): Promise<TasksEntity[]> {
    const tasks = data.map(taskDTO => {
      const task = new TasksEntity();
      task.title = taskDTO.title;
      task.description = taskDTO.description;
      task.status = Status.WAITING;
      task.priority = taskDTO.priority
      task.processesId = process;
      return task;
    });

    return await this.tasksRepository.save(tasks);
  }

  async storeMultiple(data: SaveTaskDTO[]): Promise<TasksEntity[]> {
    const tasks = await Promise.all(
      data.map(async (taskData) => {
        const task = this.tasksRepository.create(taskData);
        await this.tasksRepository.insert(task);
        return task;
      }),
    );
    return tasks;
  }

  async saveMultiple(tasks: TasksEntity[]): Promise<TasksEntity[]> {
    const savedTasks = await this.tasksRepository.save(tasks);
    return savedTasks;
  }
}
