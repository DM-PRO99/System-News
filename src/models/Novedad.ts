import { Schema, model, models, type Document } from "mongoose";

export type NovedadEstado = "Pendiente" | "En proceso" | "Finalizada";

export interface INovedad extends Document {
  cedula: string;
  nombreCompleto: string;
  correo: string;
  celular: string;
  descripcion: string;
  estado: NovedadEstado;
  createdAt: Date;
  updatedAt: Date;
}

const NovedadSchema = new Schema<INovedad>(
  {
    cedula: {
      type: String,
      required: true,
      trim: true,
    },
    nombreCompleto: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      trim: true,
    },
    celular: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En proceso", "Finalizada"],
      default: "Pendiente",
    },
  },
  {
    timestamps: true,
  }
);

export const Novedad = models.Novedad || model<INovedad>("Novedad", NovedadSchema);

