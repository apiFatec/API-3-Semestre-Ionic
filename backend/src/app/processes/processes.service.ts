import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessesEntity } from './entities/processes.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ProcessesService {

    constructor(@InjectRepository(ProcessesEntity)
        private readonly processesRepository: Repository<ProcessesEntity>) { }

    async findAll(){
        return await this.processesRepository.find();
    }

    async findOne(id:string){
        return await this.processesRepository.findOneBy({id:id});
    }

    async create(data){
        return await this.processesRepository.save(this.processesRepository.create(data));
    }

    async update(id:string, data){
        const processes = await this.processesRepository.findOneBy({id:id});

        this.processesRepository.merge(processes, data);
        return await this.processesRepository.save(processes);
    }

    async deleteById(id: string) { 
        return await this.processesRepository.delete(id);
    };
}