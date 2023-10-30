import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TeamsEntity } from './entities/teams.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { SaveTeamDTO } from './dto/save-team.dto';
import { UsuariosService } from '../users/users.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamsEntity)
    private readonly teamsRepository: Repository<TeamsEntity>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async findAll(): Promise<TeamsEntity[]> {
    const result = await this.teamsRepository.find({
      relations: { users: true },
    });
    return result;
  }

  async findOne(id: string): Promise<TeamsEntity | null> {
    const query = `
    SELECT 
      teams.*,
      JSON_AGG(users.*) AS users
    FROM teams
    INNER JOIN users ON teams.id = users."teams_id"
    WHERE teams.id = $1
    GROUP BY teams.id
  `;
    const result = await this.teamsRepository.query(query, [id]);
    return result[0] || null;
  }

  async store(data: SaveTeamDTO): Promise<TeamsEntity> {
    const { users, leader, ...result } = data;

    const team = this.teamsRepository.create(result);

    if (leader) {
      team.leader = leader;
    }

    if (users && users.length > 0) {
      const userEntities: UsersEntity[] = users.map((userData) => {
        const user = new UsersEntity();
        user.name = userData.name;
        user.role = userData.role;
        return user;
      });

      userEntities.forEach((user) => {
        user.teamsId = team;
      });

      await this.teamsRepository.save(team);
    }

    return team;
  }

  async update(id: string, data: SaveTeamDTO): Promise<TeamsEntity> {
    const team = await this.teamsRepository.findOneBy({ id: id });

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
}
