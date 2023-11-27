import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../tasks/entities/tasks.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,) { }

  create(createComentarioDto: CreateComentarioDto) {
    const comentario = new Comentario()

    comentario.task = createComentarioDto.taskId
    comentario.user = createComentarioDto.userId
    comentario.comentario = createComentarioDto.comentario

    return this.comentarioRepository.save(comentario);
  }

  findComentarioByTask(taskId: string) {
    return this.comentarioRepository.query(`
    SELECT comentarios.id, comentario, "userId", "taskId", users.name, "profileImage"
	  FROM public.comentarios
	  JOIN users ON "userId" = users.id
	  WHERE "taskId" = '${taskId}'
    `
    )
  }

  deleteComentario(id: string){
    return this.comentarioRepository.delete(id)
  }
}
