import { TokenController } from './../token/token.controller';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { SaveUserDto } from './dto/save-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usuariosRepository: Repository<UsersEntity>,
    private readonly teamsServices: TeamsService,
  ) {}

  async store(data: SaveUserDto): Promise<UsersEntity> {
    const usuario = this.usuariosRepository.create(data);

    await this.usuariosRepository.insert(usuario);
    return usuario;
  }

  async saveProfileImage(pathImage: string, id: string): Promise<void> {
    await this.usuariosRepository.update(id, { profileImage: pathImage });
  }

  async findOne(email: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosRepository.find({
      relations: { teams: true },
    });
  }

  async update(idUser: string, idTeam: string): Promise<UpdateResult> {
    const user = await this.usuariosRepository.findOneBy({ id: idUser });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const team = await this.teamsServices.findOne(idTeam);
    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }

    user.teams = team;

    return await this.usuariosRepository.update(idUser, user);
  }

  async removeFromTeam(idUser: string) {
    await this.usuariosRepository.update(idUser, { teams: { id: null } });
  }
}
