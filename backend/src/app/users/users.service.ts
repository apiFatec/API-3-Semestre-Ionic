import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usuariosRepository: Repository<UsersEntity>
  ) { }

  async store(data: any): Promise<any> {
    const usuario = this.usuariosRepository.create(data);

    await this.usuariosRepository.insert(usuario);
    return usuario;
  }

  async findOneLogin(email: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { email: email } });
  }
  
  async findOne(id: string): Promise<UsersEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<UsersEntity[] | undefined> {
    return await this.usuariosRepository.find();
  }
}
