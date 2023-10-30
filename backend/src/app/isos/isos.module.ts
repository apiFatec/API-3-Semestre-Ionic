import { Module } from '@nestjs/common';
import { IsosController } from './isos.controller';
import { IsosService } from './isos.service';
import { IsosEntity } from './entities/isos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IsosEntity])],
  controllers: [IsosController],
  providers: [IsosService],
})
export class IsosModule {}
