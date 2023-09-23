import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { SaveUserDto } from './dto/save-users.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usuariosRepository: Repository<UsersEntity>
  ) { }

  async store(data: SaveUserDto): Promise<UsersEntity> {
    const usuario = this.usuariosRepository.create(data);

    await this.usuariosRepository.insert(usuario);
    return usuario;
  }

  async findOne(email: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { email: email } });
  }

  async findAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosRepository.find();
  }
}
