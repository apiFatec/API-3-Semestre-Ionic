import { ProcessesService } from "./processes.service";
import { Body,ParseUUIDPipe, Controller,Delete,HttpCode, Get, Param, Post, Put } from "@nestjs/common";

@Controller('processes')
export class ProcessesController{
    constructor( private readonly processesService : ProcessesService){}

    @Get()
    async index(){
        return await this.processesService.findAll();
    }

    @Post()
    async create(@Body() body){
        return await this.processesService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.processesService.findOne(id)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body){
        return await this.processesService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', new ParseUUIDPipe()) id: string){
        await this.processesService.deleteById(id)
    }

}