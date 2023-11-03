import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { IsosEntity } from './entities/isos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveIsoDto } from './dto/save-iso.dto';
import { Request } from 'express';
import { title } from 'process';

@Injectable()
export class IsosService {
  constructor(
    @InjectRepository(IsosEntity)
    private readonly isosRepository: Repository<IsosEntity>
  ) { }

  async saveData(file: Express.Multer.File, req: Request, isoDto : SaveIsoDto){
    const iso = new IsosEntity();
    iso.title = isoDto.title;
    iso.description = isoDto.description;
    iso.url = `${req.protocol}://${req.get('host')}/isos/${iso.title}/${file.filename}`;

    return await this.isosRepository.save(iso);
  }

  async getIso(nameIso : string){
    const query = `
    SELECT id, title, description, url
    FROM public.isos WHERE title = '${nameIso}';
    `;

    return this.isosRepository.query(query);
  }

  async findOneById(id: string): Promise<IsosEntity | NotFoundException> {
    let iso: IsosEntity;
    try {
      iso = await this.isosRepository.findOne({where: {id}});
    } catch (err) {
      throw new NotFoundException("Iso não encontrada");
    }

    return iso;
  }

  async updateById(id: string, updateIso: any): Promise<IsosEntity | UpdateResult> {
    let updatedIso: UpdateResult;
    try {
      updatedIso = await this.isosRepository.update(id, updateIso);
    } catch (err) {
      throw new NotFoundException("Iso não encontrada");
    }
    return updatedIso;
  }

  async softRemove(id: string): Promise<void> {
    try {
      await this.isosRepository.findOneByOrFail({ id });
      await this.isosRepository.softDelete(id);
    } catch (err) {
      throw new NotFoundException('Iso não encontrada');
    }
  }
}