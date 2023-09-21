import {Param, Body, Controller, Get, ParseUUIDPipe, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { ProcessesService } from './processes.service';

@Controller('processes')
export class ProcessesController {
    constructor( private readonly processesService : ProcessesService){}

    @Get()
    async index(){
        return await this.processesService.findAll();
    }

    @Post()
    async createProcess(@Body() body){
        return await this.processesService.create(body)
    }

    @Get(':id')
    async showProcess(@Param('id', new ParseUUIDPipe()) id:string){
        return await this.processesService.findOne(id);
    }

    @Put(':id')
    async updateProcess(@Param('id', new ParseUUIDPipe()) id:string, @Body() body){
        return await this.processesService.update(id, body)
    }

    @Delete(':id')
    async deleteProcess(@Param('id', new ParseUUIDPipe()) id:string){
        await this.processesService.deleteById(id);
    }
}