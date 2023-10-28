import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { IsosEntity } from './entities/isos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveIsoDto } from './dto/save-iso.dto';

@Injectable()
export class IsosService {
  constructor(
    @InjectRepository(IsosEntity)
    private readonly isosRepository: Repository<IsosEntity>
  ) { }

  async create(isoDto: SaveIsoDto): Promise<IsosEntity> {
    const iso = this.isosRepository.create(isoDto);
    try {
      await this.isosRepository.insert(iso);
    } catch (err) {
      throw new BadRequestException('Erro ao salvar ISO');
    }
    return iso;
  }

  async findAll(): Promise<IsosEntity[] | undefined> {
    return await this.isosRepository.find();
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
