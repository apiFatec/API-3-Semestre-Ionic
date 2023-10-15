import { Controller, UseGuards, Post, Request, Get, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginUser } from './dto/login-user.dto';
import { UsersEntity } from './entities/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SaveUserDto } from './dto/save-users.dto';
import { TokenService } from '../token/token.service';

@Controller('users')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
    private readonly tokenService : TokenService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  async createUser(@Body() body: SaveUserDto): Promise<any> {
    return await this.usuariosService.store(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosService.findAll();
  }

  @Get(':token')
  async getOne(@Param('token') idUser: string){
    const token = idUser;
    const decodedToken = await this.tokenService.decodeJwt(token);
    console.log(decodedToken)
    const user = await this.usuariosService.findOne(decodedToken.email);

    const objUser = {
      id : user.id,
      name: user.name
    }

    return objUser;
  }
}
