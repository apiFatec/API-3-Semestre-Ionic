//files.controller.ts
import {
  Controller,
  Post, Get,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
  ParseUUIDPipe,
  Res,
  StreamableFile
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import e, { Request } from 'express';
import { createReadStream } from 'fs';
import * as fs from 'fs'
import { join } from 'path';

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

  @Get('task/:taskId')
  async getFilesByTask(@Param('taskId', new ParseUUIDPipe()) taskId: string) {
    return await this.filesService.getFilesForTask(taskId);
  }

  @Get(':userName/:fileName')
  getFile(
    @Param('userName') userName: string,
    @Param('fileName') fileName: string,
  ): StreamableFile {
    const file = fs.createReadStream(join(process.cwd(), `/upload/files/${userName}/${fileName}`));
    return new StreamableFile(file);
  }
}
