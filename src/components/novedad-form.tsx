"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { novedadSchema, type NovedadFormValues } from "@/utils/validators";
import { toast } from "sonner";

export function NovedadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<NovedadFormValues>({
    resolver: zodResolver(novedadSchema),
    mode: "onChange",
    defaultValues: {
      cedula: "",
      nombreCompleto: "",
      correo: "",
      celular: "",
      descripcion: "",
    },
  });

  const onSubmit = async (values: NovedadFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/novedades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "No se pudo registrar la novedad.");
      }

      toast.success("✅ Novedad registrada con éxito", {
        description: "El equipo administrativo la revisará pronto.",
      });
      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 4500);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      toast.error("No se pudo registrar la novedad", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="relative overflow-hidden border-none bg-white/80 shadow-lg shadow-primary/10 backdrop-blur dark:bg-slate-900/60">
      <motion.div
        className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <CardHeader className="relative space-y-3">
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-foreground">
          <ClipboardList className="h-6 w-6 text-primary" />
          Registrar nueva novedad
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Completa el formulario y nuestro equipo dará seguimiento a tu solicitud. Todos los campos
          son obligatorios.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="cedula">Cédula</Label>
            <Input
              id="cedula"
              placeholder="Ej: 1234567890"
              inputMode="numeric"
              {...register("cedula")}
              aria-invalid={errors.cedula ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.cedula && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.cedula.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombreCompleto">Nombre completo</Label>
            <Input
              id="nombreCompleto"
              placeholder="Nombre y apellidos"
              {...register("nombreCompleto")}
              aria-invalid={errors.nombreCompleto ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.nombreCompleto && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.nombreCompleto.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              placeholder="tu@correo.com"
              {...register("correo")}
              aria-invalid={errors.correo ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.correo && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.correo.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular">Número de celular</Label>
            <Input
              id="celular"
              placeholder="Ej: 0987654321"
              inputMode="numeric"
              {...register("celular")}
              aria-invalid={errors.celular ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.celular && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.celular.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción de la novedad</Label>
            <Textarea
              id="descripcion"
              placeholder="Cuéntanos los detalles de la novedad o petición..."
              rows={5}
              {...register("descripcion")}
              aria-invalid={errors.descripcion ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.descripcion && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.descripcion.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            className="group relative w-full overflow-hidden bg-gradient-to-r from-primary via-indigo-500 to-secondary text-base font-semibold shadow-lg shadow-primary/20 transition hover:shadow-xl hover:shadow-primary/30"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
                <motion.span
                  key="enviando"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  Enviando...
                </motion.span>
              ) : (
                <motion.span
                  key="enviar"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <SendHorizonal className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Enviar novedad
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0"
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </Button>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-primary shadow-sm"
              >
                ¡Gracias! Tu novedad fue recibida y está en estado <strong>Pendiente</strong>. Te
                notificaremos cualquier actualización.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  );
}

