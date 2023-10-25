import { Module } from '@nestjs/common';
import { IsosController } from './isos.controller';
import { IsosService } from './isos.service';

@Module({
  controllers: [IsosController],
  providers: [IsosService]
})
export class IsosModule {}
