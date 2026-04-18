
// CU-04: Definición de estados permitidos
export enum EstadoOrden {
  RECIBIDO = 'RECIBIDO',
  EN_REPARACION = 'EN_REPARACION',
  LISTO = 'LISTO',
  ENTREGADO = 'ENTREGADO',
}

/** Representa al dueño del vehículo (CU-01) */
export interface Cliente {
  id: number;
  nombre: string;
  documento: string; // Cédula o NIT
  telefono: string;
  email?: string;
  vehiculos?: Vehiculo[];
}

/** Representa el vehículo que ingresa al taller (CU-01) */
export interface Vehiculo {
  id: number;
  placa: string; // Usado para CU-05 (Historial)
  marca: string;
  modelo: string;
  anio: number;
  clienteId: number;
  ordenes?: OrdenServicio[];
}

/** Trabajador asignado a la reparación (CU-02) */
export interface Mecanico {
  id: number;
  nombre: string;
  especialidad: string;
}

/** Documento principal que gestiona el trabajo (CU-02, CU-04) */
export interface OrdenServicio {
  id: number;
  fechaCreacion: Date;
  descripcionProblema: string;
  estado: EstadoOrden;
  vehiculoId: number;
  mecanicoId: number;
  
  /** Suma de repuestos y mano de obra (CU-04) */
  costoTotal: number;
  
  // Relaciones
  repuestos?: DetalleRepuesto[];
}

/** Catálogo general de piezas disponibles */
export interface Repuesto {
  id: number;
  nombre: string;
  precioBase: number;
  stock: number;
}

/** * CU-03: Detalle de repuestos usados en una orden específica.
 * Registra cuántos se usaron y el precio en ese momento.
 */
export interface DetalleRepuesto {
  id: number;
  ordenServicioId: number;
  repuestoId: number;
  cantidad: number;
  precioUnitario: number; // Se captura el precio al momento de la venta
}
