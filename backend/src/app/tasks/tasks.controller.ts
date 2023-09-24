import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JoinTaskDto } from './dto/join-task.dto';
import { TokenService } from '../token/token.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tokenService: TokenService
  ) { }

  @Post('/join-task')
  async joinTask(@Body() body: JoinTaskDto) {
    const token = body.user.token;
    const decodedToken = await this.tokenService.decodeJwt(token);
    console.log(decodedToken);
    return await this.tasksService.joinTask(body.task, decodedToken.email);
  }
}
