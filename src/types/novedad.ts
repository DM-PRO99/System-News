export type NovedadEstado = "Pendiente" | "En proceso" | "Finalizada";

export type Novedad = {
  _id: string;
  cedula: string;
  nombreCompleto: string;
  correo: string;
  celular: string;
  descripcion: string;
  estado: NovedadEstado;
  createdAt: string;
  updatedAt: string;
};

