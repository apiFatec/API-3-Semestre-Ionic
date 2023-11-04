import { Module, forwardRef } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UsuariosModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsEntity } from './entities/teams.entity';

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    TypeOrmModule.forFeature([TeamsEntity]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
