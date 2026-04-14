import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdenesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // 1. Buscamos el vehículo por placa
    let vehiculo = await this.prisma.vehiculo.findUnique({
      where: { placa: data.placa }
    });

    // 2. Si el vehículo no existe, lo creamos junto con el cliente
    if (!vehiculo) {
      const cliente = await this.prisma.cliente.upsert({
        where: { cedula: data.cedula },
        update: {},
        create: {
          nombre: data.cliente,
          cedula: data.cedula,
          telefono: "3000000000", // Valor por defecto
        }
      });

      vehiculo = await this.prisma.vehiculo.create({
        data: {
          placa: data.placa,
          marca: data.modelo.split(' ')[0] || "Generica",
          modelo: data.modelo,
          clienteId: cliente.id
        }
      });
    }

    // 3. Finalmente creamos la orden con el costo total
    // Nota: Usamos parseInt para asegurar que los IDs sean números y no strings
    return this.prisma.orden.create({
      data: {
        descripcion: data.problema,
        total: parseFloat(data.total),
        mecanicoId: parseInt(data.mecanico) || 1,
        vehiculoId: vehiculo.id
      }
    });
  }

  // --- LAS FUNCIONES QUE TE HACÍAN FALTA ---

  // Caso de uso: Consultar historial por placa
  async findAllByPlaca(placa: string) {
    return this.prisma.orden.findMany({
      where: { 
        vehiculo: { 
          placa: placa.toUpperCase() 
        } 
      },
      include: { 
        vehiculo: {
          include: { cliente: true }
        }
      }
    });
  }

  // Listar todas las órdenes para el reporte general del taller
  async findAll() {
    return this.prisma.orden.findMany({
      include: { 
        vehiculo: true 
      }
    });
  }
}