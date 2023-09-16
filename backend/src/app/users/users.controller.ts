import { Controller, UseGuards, Post, Request, Get, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginUser } from './dto/login-user.dto';
import { UsersEntity } from './entities/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post()
  async createUser(@Body() body): Promise<any> {
    return await this.usuariosService.store(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosService.findAll();
  }
}
