//files.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('/task/:taskId/user/:userId/username/:userName')
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('userName') userName: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.filesService.salvarDados(userName, userId, taskId, file, req);
  }
}
