import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './entities/usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepository: Repository<UsuariosEntity>
  ) { }

  async store(data: any): Promise<any> {
    const usuario = this.usuariosRepository.create(data);

    await this.usuariosRepository.insert(usuario);
    return usuario;
  }
  
  async findOne(email: string): Promise<UsuariosEntity | undefined> {
    return await this.usuariosRepository.findOne({ where: { email: email } });
  }
}
