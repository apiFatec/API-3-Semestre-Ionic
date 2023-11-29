import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TeamsEntity } from './entities/teams.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { SaveTeamDTO } from './dto/save-team.dto';
import { UsuariosService } from '../users/users.service';
import { UUID } from 'crypto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamsEntity)
    private readonly teamsRepository: Repository<TeamsEntity>,
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService,
  ) { }

  async findAll(): Promise<TeamsEntity[]> {
    const result = await this.teamsRepository.find({
      relations: {
        users: true,
        leader: true
      }
    });
    return result;
  }

  async findOne(id: string): Promise<TeamsEntity | undefined> {
    return await this.teamsRepository.findOne({
      where: { id },
      relations: {
        users: true,
        leader: true
      }
    })
  }

  async store(data: SaveTeamDTO): Promise<TeamsEntity> {
    const { users, ...result } = data;
    const team = this.teamsRepository.create(result);
    await this.teamsRepository.insert(team);

    if (users && users.length > 0) {
      for (const userData of users) {
        await this.usuariosService.update(userData.id, team.id);
      }
    }

    return team;
  }

  async update(id: string, data: SaveTeamDTO): Promise<TeamsEntity> {
    const team = await this.teamsRepository.findOne({
      where: { id: id },
      relations: { users: true },
    });
    console.log(id);
    console.log(team);

    if (!team) {
      return null;
    }

    team.name = data.name;

    if (data.leader) {
      team.leader = data.leader;
    }

    await this.teamsRepository.save(team);
    return team;
  }

  async deleteById(id: string): Promise<void> {
    const team = await this.teamsRepository.findOneBy({ id: id });

    if (team) {
      await this.teamsRepository.softRemove(team);
    }
  }

  async createTeam(data: SaveTeamDTO): Promise<TeamsEntity> {
    const team = this.teamsRepository.create(data);

    await this.teamsRepository.insert(team);

    return team;
  }

  async findLeader(id : string){
    const query = `
    SELECT users.email
    FROM processes
    JOIN teams ON processes."teamId" = teams.id
    JOIN users ON teams.leader_id = users.id
    WHERE processes.id = '${id}' ;`

    return await this.teamsRepository.query(query)
  }
}
