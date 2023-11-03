import { title } from 'process';
import { Body, Controller, Delete, Get, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseUUIDPipe, Patch, Post, Req, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { IsosService } from './isos.service';
import { SaveIsoDto } from './dto/save-iso.dto';
import { IsosEntity } from './entities/isos.entity';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import MulterConfigIso from './multer-config-iso';
import * as fs from "fs"
import { join } from 'path';

@Controller('isos')
export class IsosController {
  constructor(
    private readonly isosService: IsosService
  ) { }

  // @Get()
  // async index(): Promise<IsosEntity[]> {
  //   return await this.isosService.findAll();
  // }

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
  ): Promise<IsosEntity | UpdateResult | NotFoundException> {
    return await this.isosService.updateById(id, body);
  }

  @Delete('/:id')
  async removeIso(@Param('id', new ParseUUIDPipe()) id: string): Promise<void | NotFoundException> {
    return await this.isosService.softRemove(id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', MulterConfigIso))
  uploadFile(@UploadedFile() file : Express.Multer.File, @Body() body : SaveIsoDto, @Req() req: Request){
    return this.isosService.saveData(file, req, body)
  }

  @Get(':isoName/:isoFileName')
  getIso(
    @Param('isoName') isoName : string,
    @Param('isoFileName') isoFileName : string,) : StreamableFile {
      const file = fs.createReadStream(join(process.cwd(), `/upload/ISOs/${isoName}/${isoFileName}`))
      return new StreamableFile(file);
  }

  @Get()
  async getAll(){
    return await this.isosService.getAll();
  }
}