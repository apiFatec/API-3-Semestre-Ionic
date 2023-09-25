import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessesEntity } from './entities/processes.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { SaveProcessDTO } from './dto/save-processes.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ProcessesService {
    constructor(
        @InjectRepository(ProcessesEntity)
        private readonly processesRepository: Repository<ProcessesEntity>,
        private readonly tasksService: TasksService,
    ) { }

    async findAll(): Promise<ProcessesEntity[]> {
        const query = `
            SELECT 
            processes.name AS process_name,
            processes.description AS process_description,
            processes.deadline AS process_deadline,
            processes.status AS process_status,
            processes.id AS process_id,
            JSON_AGG(json_build_object('name', users.name, 'role', users.role, 'id', users.id)) AS users
            FROM processes
            INNER JOIN users_processes ON processes.id = users_processes.processes_id
            INNER JOIN users ON users_processes.users_id = users.id
            GROUP BY processes.id
        `;

        const result = await this.processesRepository.query(query);
        return result;
    }

    async findOne(id: string) {
        return await this.processesRepository.findOneBy({ id: id });
    }

    async store(data: SaveProcessDTO): Promise<ProcessesEntity> {
        const { tasks, ...result } = data;

        const process = this.processesRepository.create(result);

        await this.processesRepository.save(process);

        if (tasks && tasks.length > 0) {
            const taskEntities = await this.tasksService.storeMultiple(tasks);

            taskEntities.forEach((task) => {
                task.process = process;
            });

            await this.tasksService.saveMultiple(taskEntities);
        }

        return process;
    }

    async update(id:string, data){
        const process = await this.processesRepository.findOneBy({id:id});
        
        this.processesRepository.merge(process, data);
        return await this.processesRepository.save(process);
    }
    async deleteById(id: string){
        await this.processesRepository.findOneByOrFail({id:id});
        await this.processesRepository.softDelete(id);
    }
}
