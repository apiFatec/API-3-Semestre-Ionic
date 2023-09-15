import { Controller, UseGuards, Post, Request, Get, Body, Param } from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { UsuariosService } from './usuarios.service';
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user
  }

  @Post()
  async createUser(@Body() body): Promise<any> {
    return await this.usuariosService.store(body);
  }
}
