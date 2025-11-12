"use client";

import { Badge } from "@/components/ui/badge";
import type { NovedadEstado } from "@/types/novedad";

const statusVariants: Record<NovedadEstado, string> = {
  Pendiente: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  "En proceso": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  Finalizada: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
};

export function StatusBadge({ estado }: { estado: NovedadEstado }) {
  return <Badge className={statusVariants[estado]}>{estado}</Badge>;
}

