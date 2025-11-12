"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { novedadSchema, type NovedadFormValues } from "@/utils/validators";
import type { Novedad } from "@/types/novedad";

type NovedadDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  novedad: Novedad | null;
  onSave: (id: string, values: Partial<NovedadFormValues>) => Promise<void>;
  isSaving: boolean;
};

export function NovedadDetailModal({
  open,
  onOpenChange,
  novedad,
  onSave,
  isSaving,
}: NovedadDetailModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<NovedadFormValues>({
    resolver: zodResolver(novedadSchema),
    defaultValues: {
      cedula: "",
      nombreCompleto: "",
      correo: "",
      celular: "",
      descripcion: "",
      estado: "Pendiente",
    },
  });

  useEffect(() => {
    if (novedad) {
      reset({
        cedula: novedad.cedula,
        nombreCompleto: novedad.nombreCompleto,
        correo: novedad.correo,
        celular: novedad.celular,
        descripcion: novedad.descripcion,
        estado: novedad.estado,
      });
    }
  }, [novedad, reset]);

  const estadoValue = watch("estado");

  const onSubmit = async (values: NovedadFormValues) => {
    if (!novedad) return;
    await onSave(novedad._id, values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-white/95 p-0 shadow-2xl backdrop-blur dark:bg-slate-900/95">
        <DialogHeader className="space-y-2 border-b border-border/40 bg-gradient-to-r from-primary/10 via-indigo-500/10 to-secondary/10 px-6 py-5">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Detalles de la novedad
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Consulta y actualiza la información de la novedad seleccionada.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cédula" error={errors.cedula?.message}>
              <Input {...register("cedula")} />
            </Field>
            <Field label="Nombre completo" error={errors.nombreCompleto?.message}>
              <Input {...register("nombreCompleto")} />
            </Field>
            <Field label="Correo electrónico" error={errors.correo?.message}>
              <Input type="email" {...register("correo")} />
            </Field>
            <Field label="Número de celular" error={errors.celular?.message}>
              <Input {...register("celular")} />
            </Field>
          </div>
          <Field label="Descripción" error={errors.descripcion?.message}>
            <Textarea rows={4} {...register("descripcion")} />
          </Field>
          <Field label="Estado" error={errors.estado?.message}>
            <Select
              value={estadoValue}
              onValueChange={(value) =>
                setValue("estado", value as NovedadFormValues["estado"], { shouldDirty: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En proceso">En proceso</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !isDirty}
              className="bg-gradient-to-r from-primary via-indigo-500 to-secondary hover:shadow-lg"
            >
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      {children}
      {error ? (
        <motion.p
          className="text-xs text-destructive"
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}

