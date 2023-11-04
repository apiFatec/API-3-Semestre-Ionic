import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseUUIDPipe,
  Req,
  Patch,
} from '@nestjs/common';
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
  ) {}

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

  @Get(':token')
  async getOne(@Param('token') idUser: string) {
    const token = idUser;
    const decodedToken = await this.tokenService.decodeJwt(token);


    console.log(decodedToken)
    const user =await this.usuariosService.findOne(decodedToken.email);
    return user
  }

  @Get('/id/:id')
  async getOneid(@Param('id') idUsuario: string){
    return await this.usuariosService.findOneById(idUsuario)

    const user = await this.usuariosService.findOne(decodedToken.email);

    return {
      id: user.id,
      name: user.name,
    };
  }

  @Patch('/remove-team/:id')
  async removeFromTeam(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuariosService.removeFromTeam(id);

  }
}
