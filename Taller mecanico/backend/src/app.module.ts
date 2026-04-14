import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // Importamos el puente a la DB
import { ClientesModule } from './clientes/clientes.module';
import { OrdenesModule } from './ordenes/ordenes.module';

@Module({
  imports: [ClientesModule, OrdenesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Registramos PrismaService aquí
})
export class AppModule {}