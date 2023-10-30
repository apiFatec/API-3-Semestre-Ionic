import { Module } from '@nestjs/common';
import { IsosController } from './isos.controller';
import { IsosService } from './isos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsosEntity } from './entities/isos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IsosEntity])],
  controllers: [IsosController],
  providers: [IsosService],
})
export class IsosModule { }
