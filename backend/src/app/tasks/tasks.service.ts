import { Injectable } from '@nestjs/common';
import { TasksEntity } from './entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveTaskDTO } from './dto/save-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async store(data: SaveTaskDTO): Promise<TasksEntity> {
    const task = this.tasksRepository.create(data);
    await this.tasksRepository.insert(task);
    return task;
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
