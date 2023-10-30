import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UsuariosModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsEntity } from './entities/teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamsEntity]), UsuariosModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
