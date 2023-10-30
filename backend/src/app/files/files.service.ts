import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}
  async salvarDados(userName:string, userId:string, tasksId: string,file: Express.Multer.File, req: Request) {
    const arquivo = new File();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.taskId = tasksId;
    arquivo.usersId = userId
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${userName}/${file.filename}`;

    return await this.fileRepository.save(arquivo);
  }

  async getFilesForTask(taskId: string): Promise<File[]> {
    const query = `
    SELECT "fileName", "contentLength", "contentType", url, id, "taskIdId", "usersIdId"
	  FROM public.file WHERE "taskIdId" = '${taskId}' ;`;
    return await this.fileRepository.query(query);
  }
}
