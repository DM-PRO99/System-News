import { z } from "zod";

export const novedadSchema = z.object({
  cedula: z
    .string()
    .min(5, "La cédula debe tener al menos 5 caracteres")
    .max(15, "La cédula no puede superar 15 caracteres")
    .regex(/^\d+$/, "La cédula solo debe contener números"),
  nombreCompleto: z
    .string()
    .min(3, "Ingresa el nombre completo")
    .max(120, "El nombre es demasiado largo"),
  correo: z.string().email("Ingresa un correo válido"),
  celular: z
    .string()
    .regex(/^\d{10}$/, "El número de celular debe tener 10 dígitos"),
  descripcion: z
    .string()
    .min(10, "Describe la novedad con al menos 10 caracteres")
    .max(500, "La descripción no puede superar 500 caracteres"),
  estado: z.enum(["Pendiente", "En proceso", "Finalizada"]).optional(),
});

export type NovedadFormValues = z.infer<typeof novedadSchema>;

