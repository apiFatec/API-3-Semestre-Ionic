import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { SaveTeamDTO } from './dto/save-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Get()
  async index() {
    return await this.teamsService.findAll();
  }

  @Post()
  async createteam(@Body() body: SaveTeamDTO) {
    return await this.teamsService.store(body);
  }

  @Get(':id')
  async showProcess(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.teamsService.findOne(id);
  }

  @Put(':id')
  async updateProcess(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body,
  ) {
    return await this.teamsService.update(id, body);
  }

  @Delete(':id')
  async deleteProcess(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.teamsService.deleteById(id);
  }
}
