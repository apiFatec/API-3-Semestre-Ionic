import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get(':id')
  findAll(@Param('id', new ParseUUIDPipe) taskId: string) {
    return this.comentariosService.findComentarioByTask(taskId);
  }

  @Delete(':id')
  delete(@Param('id',new ParseUUIDPipe) id : string) {
    return this.comentariosService.deleteComentario(id)
  }
}
