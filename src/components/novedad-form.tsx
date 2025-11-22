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
    <Card className="relative overflow-hidden border border-border/60 bg-card/98 shadow-2xl shadow-primary/30 backdrop-blur-xl ring-1 ring-primary/5">
      <motion.div
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 via-primary-light/15 to-accent/20 blur-3xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 20, ease: "linear" },
          scale: { repeat: Infinity, duration: 8, ease: "easeInOut" }
        }}
      />
      <CardHeader className="relative space-y-4 pb-6">
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-primary via-primary-light to-accent p-3 shadow-xl shadow-primary/30"
          >
            <ClipboardList className="h-7 w-7 text-white" />
          </motion.div>
          <div className="flex-1">
            <CardTitle className="text-3xl font-extrabold text-foreground tracking-tight">
              Registrar nueva novedad
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Completa el formulario y nuestro equipo dará seguimiento a tu solicitud. Todos los campos
              son obligatorios.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-2">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2.5">
            <Label htmlFor="cedula" className="text-sm font-semibold text-foreground">Cédula</Label>
            <Input
              id="cedula"
              placeholder="Ej: 1234567890"
              inputMode="numeric"
              className="h-11 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
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
          <div className="space-y-2.5">
            <Label htmlFor="nombreCompleto" className="text-sm font-semibold text-foreground">Nombre completo</Label>
            <Input
              id="nombreCompleto"
              placeholder="Nombre y apellidos"
              className="h-11 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
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
          <div className="space-y-2.5">
            <Label htmlFor="correo" className="text-sm font-semibold text-foreground">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              placeholder="tu@correo.com"
              className="h-11 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
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
          <div className="space-y-2.5">
            <Label htmlFor="celular" className="text-sm font-semibold text-foreground">Número de celular</Label>
            <Input
              id="celular"
              placeholder="Ej: 0987654321"
              inputMode="numeric"
              className="h-11 border-border/60 focus:border-primary focus:ring-primary/20 transition-all"
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
          <div className="space-y-2.5">
            <Label htmlFor="descripcion" className="text-sm font-semibold text-foreground">Descripción de la novedad</Label>
            <Textarea
              id="descripcion"
              placeholder="Cuéntanos los detalles de la novedad o petición..."
              rows={5}
              className="border-border/60 focus:border-primary focus:ring-primary/20 transition-all resize-none"
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
            className="group relative w-full overflow-hidden bg-gradient-to-r from-primary via-primary-light to-accent hover:from-primary/90 hover:via-primary-light/90 hover:to-accent/90 text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] h-12"
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

