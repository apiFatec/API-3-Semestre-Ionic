import { Injectable, NotFoundException } from "@nestjs/common";
import { ProcessesEntity } from "./entities/processes.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProcessesService{
    constructor(@InjectRepository(ProcessesEntity) 
    private readonly processesRepository: Repository<ProcessesEntity>
    ){}

    async findAll() {
        return await this.processesRepository.find();
    }

    async findOne(id:string){
        return await this.processesRepository.findOneBy({id:id});
    }

    async create(data){
        return await this.processesRepository.save(this.processesRepository.create(data));
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