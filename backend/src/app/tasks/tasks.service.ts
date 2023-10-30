import { IsEmail } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Status, TasksEntity } from './entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveTaskDTO } from './dto/save-task.dto';
import { ProcessesEntity } from '../processes/entities/processes.entity';
import { UsersTasksEntity } from './entities/usersTasks.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { UsuariosService } from '../users/users.service';
import { use } from 'passport';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    @InjectRepository(UsersTasksEntity)
    private readonly usersTasksRepository: Repository<UsersTasksEntity>,
    private readonly usersServices: UsuariosService,
  ) {}

  async store(
    data: SaveTaskDTO[],
    process: ProcessesEntity,
  ): Promise<TasksEntity[]> {
    const tasks = data.map((taskDTO) => {
      const task = new TasksEntity();
      task.title = taskDTO.title;
      task.description = taskDTO.description;
      task.status = Status.WAITING;
      task.priority = taskDTO.priority;
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

  async joinTask(task: TasksEntity, email: string): Promise<void> {
    const user = await this.usersServices.findOne(email);
    console.log(user);
    try {
      const userTask = new UsersTasksEntity();
      userTask.tasksId = task;
      userTask.usersId = user;
      await this.usersTasksRepository.insert(userTask);
      await this.tasksRepository.update(
        { id: task.id },
        { status: Status.INPROGRESS },
      );
    } catch {
      throw new Error('Usuário não encontrado');
    }
  }

  async finishTask(id: string) {
    try {
      await this.tasksRepository.update(
        { id: id },
        { status: Status.FINISHED },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async leaveTask(idTask: string, id: string) {
    await this.usersTasksRepository.delete({
      tasksId: { id: idTask },
      usersId: { id: id },
    });
  }

  async getMembers(idTask: string) {
    const query = `SELECT users.name, users.id
    FROM users
    JOIN users_tasks ON users.id = users_tasks.users_id
    JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE tasks.id = $1;`;

    return await this.usersTasksRepository.query(query, [idTask]);
  }

  async getTasks(id: string) {
    const query = `
    SELECT tasks.*,
    JSON_AGG(users.name) AS users
    FROM tasks
    INNER JOIN users_tasks
    ON users_tasks.tasks_id = tasks.id
    INNER JOIN users
    ON users_tasks.users_id = users.id
    WHERE tasks.processes_id = $1 AND tasks.deleted_at IS NULL
    GROUP BY tasks.id
    `;
    const tasks = await this.tasksRepository.query(query, [id]);
    return tasks;
  }

  async getUserTask(taskId: string, userId: string) {
    const query = `SELECT *
    FROM public.users_tasks WHERE users_tasks.users_id = '${userId}'
    AND users_tasks.tasks_id = '${taskId}' ;`;

    const result = await this.usersTasksRepository.query(query);
    return result;
  }

  async deleteTask(id: string) {
    await this.tasksRepository.softRemove({ id: id });
  }
}

