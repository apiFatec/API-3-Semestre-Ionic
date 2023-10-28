import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { IsosService } from './isos.service';
import { SaveIsoDto } from './dto/save-iso.dto';
import { IsosEntity } from './entities/isos.entity';
import { UpdateResult } from 'typeorm';

@Controller('isos')
export class IsosController {
  constructor(
    private readonly isosService: IsosService
  ) { }

  @Post()
  async store(@Body() body: SaveIsoDto): Promise<IsosEntity> {
    return await this.isosService.create(body);
  }

  @Get()
  async index(): Promise<IsosEntity[]> {
    return await this.isosService.findAll();
  }

  @Get('/:id')
  async getOne(
    @Param('id', new ParseUUIDPipe()
    ) id: string): Promise<IsosEntity | NotFoundException
    > {
    return await this.isosService.findOneById(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: any
    ): Promise< IsosEntity | UpdateResult | NotFoundException>{
    return await this.isosService.updateById(id, body);
  }

  @Delete('/:id')
  async removeIso(@Param('id', new ParseUUIDPipe()) id: string): Promise<void | NotFoundException> {
    return await this.isosService.softRemove(id);
  }

}
