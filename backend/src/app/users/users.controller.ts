import { Controller, UseGuards, Post, Request, Get, Body, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Express, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UsersEntity } from './entities/users.entity';
import { SaveUserDto } from './dto/save-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenService } from '../token/token.service';

@Controller('users')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/profile/:username/:id')
  @UseInterceptors(FileInterceptor('image'))
  async postImage(
    @Param('username') username: string,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    const pathName: string = `/${username}/${file.filename}`;
    return await this.usuariosService.saveProfileImage(pathName, id);
  }

  @Get('/profile/:username/:filename')
  async getProfileImage(
    @Param('username') username: string,
    @Param('filename') filename: string,
    @Res() res: Response
  ): Promise<any> {
    const path = `./uploads/${username}/${filename}`;
    return res.sendFile(path, { root: './' });
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
}
