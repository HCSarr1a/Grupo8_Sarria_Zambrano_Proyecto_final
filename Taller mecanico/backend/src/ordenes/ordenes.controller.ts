import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  // Este endpoint recibe los datos del formulario de Recepción y Taller
  @Post()
  create(@Body() createOrdenDto: any) {
    return this.ordenesService.create(createOrdenDto);
  }

  // Este sirve para el historial: buscar todas las órdenes de una placa
  @Get('vehiculo/:placa')
  findAllByPlaca(@Param('placa') placa: string) {
    return this.ordenesService.findAllByPlaca(placa);
  }

  // Listar todas las órdenes (opcional para el administrador)
  @Get()
  findAll() {
    return this.ordenesService.findAll();
  }
}