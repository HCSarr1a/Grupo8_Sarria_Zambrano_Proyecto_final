import { api } from "@/lib/api";

export interface OrdenServicio {
  id: number;
  fecha: string;
  descripcionProblema: string;
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO';
  vehiculo: {
    placa: string;
    modelo: string;
    cliente: { nombre: string };
  };
  mecanico: { nombres: string };
}

export const ordenesService = {
  // Obtener todas las órdenes
  listar: () => api.get<OrdenServicio[]>("/orden-servicio"),
  
  // Crear nueva orden (Cuando llega una moto nueva)
  crear: (data: any) => api.post<OrdenServicio>("/orden-servicio", data),
  
  // Cambiar estado (ej. de EN_PROCESO a COMPLETADO)
  actualizarEstado: (id: number, estado: string) => 
    api.patch<OrdenServicio>(`/orden-servicio/${id}`, { estado }),
};