import { Controller, Post, Body } from '@nestjs/common';
import { SaveProcessDTO } from './dto/save-processes.dto';
import { ProcessesService } from './processes.service';
import { ProcessesEntity } from './entities/processes.entity';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  async createProcess(@Body() body: SaveProcessDTO): Promise<ProcessesEntity> {
    return await this.processesService.store(body);
  }
}
