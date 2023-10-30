import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JoinTaskDto } from './dto/join-task.dto';
import { TokenService } from '../token/token.service';
import { UsuariosService } from '../users/users.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tokenService: TokenService,
    private readonly userService: UsuariosService,
  ) {}

  @Post('/join-task')
  async joinTask(@Body() body: JoinTaskDto) {
    const token = body.user;
    const decodedToken = await this.tokenService.decodeJwt(token);
    return await this.tasksService.joinTask(body.task, decodedToken.email);
  }

  @Put('/finish-task/:id')
  async finishTask(@Param('id') id: string) {
    return await this.tasksService.finishTask(id);
  }

  @Delete('/leave-task/:idTask/user/:idUser')
  @HttpCode(204)
  async leaveTask(
    @Param('idTask') idTask: string,
    @Param('idUser') idUser: string,
  ) {
    const token = idUser;
    const decodedToken = await this.tokenService.decodeJwt(token);
    const user = await this.userService.findOne(decodedToken.email);
    return await this.tasksService.leaveTask(idTask, user.id);
  }

  @Get('/members/:idTask')
  async getMembers(@Param('idTask') idTask: string) {
    return await this.tasksService.getMembers(idTask);
  }
  @Get('/:id')
  async getTasks(@Param('id') id: string) {
    return await this.tasksService.getTasks(id);
  }

  @Get(':taskId/user/:token')
  async getUserTask(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Param('userId') userId: string,
  ) {
    const token = await this.tokenService.decodeJwt(userId);
    const user = await this.userService.findOne(token.email);
    return await this.tasksService.getUserTask(taskId, user.id);
  }
  @Delete('/:id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
