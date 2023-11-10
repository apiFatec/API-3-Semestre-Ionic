import { TokenController } from './../token/token.controller';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
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
  ) { }

  async store(data: SaveUserDto): Promise<UsersEntity> {
    const usuario = this.usuariosRepository.create(data);

    await this.usuariosRepository.insert(usuario);
    return usuario;
  }

  async saveProfileImage(pathImage: string, id: string): Promise<void> {
    await this.usuariosRepository.update(id, { profileImage: pathImage });
  }

  async findOne(email: string): Promise<UsersEntity | undefined> {
    if (email) {
      return await this.usuariosRepository.findOneOrFail({
        where: { email: email },
        relations: {
          teams: true
        }
      });
    } else {
      throw new UnauthorizedException("Token Invalido")
    }

  }

  async userWithoutTeam(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosRepository.find({
      where: { teams: IsNull() },
      relations: {
        teams: true,
      },
      select: {
        address: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        birthdate: true,
        deletedAt: true,
        createdAt: true,
        gender: true,
        id: true,
        files: true,
        phone: true,
        updatedAt: true,
      }
    });
  }

  async findOneById(id: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({
      where: { id: id },
      relations: {
        teams: true,
      },
      select: {
        address: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        birthdate: true,
        deletedAt: true,
        createdAt: true,
        gender: true,
        id: true,
        files: true,
        phone: true,
        updatedAt: true,
      }
    });
  }

  async findAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosRepository.find({
      relations: {
        teams: true,
      },
      select: {
        address: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        birthdate: true,
        deletedAt: true,
        createdAt: true,
        gender: true,
        id: true,
        files: true,
        phone: true,
        updatedAt: true,

      }
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

  async removeTeam(id: string): Promise<void> {
    const user = await this.usuariosRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }
    await this.usuariosRepository.update(id, { teams: null });
  }

}
