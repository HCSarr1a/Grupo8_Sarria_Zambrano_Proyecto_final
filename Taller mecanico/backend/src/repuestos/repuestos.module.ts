import { Module } from '@nestjs/common';
import { RepuestosController } from './repuestos.controller';
import { RepuestosService } from './repuestos.service';

@Module({
  controllers: [RepuestosController],
  providers: [RepuestosService]
})
export class RepuestosModule {}
