import { Injectable, Inject } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuariosService.findOne(email);
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      const { senha, ...result} = usuario;
      return result;
    }
    return null;

  }
}
