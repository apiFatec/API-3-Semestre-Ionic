import { Controller, UseGuards, Post, Request, Get, Body, Param, UseInterceptors, UploadedFile, Res, ParseUUIDPipe, Req, Delete } from '@nestjs/common';
import { Express, Request as ReqImage, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UsersEntity } from './entities/users.entity';
import { SaveUserDto } from './dto/save-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenService } from '../token/token.service';
import { TokenEntity } from '../token/entities/token.entity';
import { async } from 'rxjs';

@Controller('users')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: ReqImage,
  ): Promise<void> {
    const pathName: string = `${req.protocol}://${req.get('host')}/users/profile/${username}/${file.filename}`;
    
    return await this.usuariosService.saveProfileImage(pathName, id);
  }

  @Get('profile/:username/:filename')
  async getProfileImage(
    @Param('username') username: string,
    @Param('filename') filename: string,
    @Res() res: Response,
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

  @Get('/one/:id')
  async getOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuariosService.findOneById(id);
  }

  @Delete('/remove-team/:id')
  async removeFromTeam(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.usuariosService.removeTeam(id);
  }

  @Get('/users-team')
  async userWithoutTeam(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosService.userWithoutTeam();
  }
}
