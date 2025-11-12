"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, LockKeyhole } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AdminAccessCard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const isLoading = status === "loading";

  const handleClick = () => {
    router.push(isAdmin ? "/admin" : "/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <Card className="relative overflow-hidden border border-border/60 bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900 text-slate-100 shadow-2xl ring-1 ring-primary/10">
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-primary/30 via-indigo-500/20 to-secondary/30 opacity-50"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),_transparent_70%)]" />
        <CardHeader className="relative space-y-4 pb-6">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-br from-primary/25 via-primary/20 to-primary/15 p-3.5 shadow-2xl shadow-primary/30 ring-2 ring-primary/30"
            >
              <ShieldCheck className="h-8 w-8 text-secondary" />
            </motion.div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-extrabold tracking-tight">Acceso administrativo</CardTitle>
              <CardDescription className="text-slate-300/90 mt-1.5 leading-relaxed">
                Consulta y gestiona todas las novedades registradas. Requiere credenciales autorizadas.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6 pt-2">
          <div className="flex flex-col gap-4 text-sm text-slate-200/90">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3.5"
            >
              <div className="rounded-lg bg-primary/20 p-1.5 mt-0.5">
                <LockKeyhole className="h-4 w-4 text-secondary" />
              </div>
              <p className="leading-relaxed">
                Visualiza el tablero con estadísticas por estado, filtros avanzados y una vista
                detallada de cada novedad.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3.5"
            >
              <div className="rounded-lg bg-primary/20 p-1.5 mt-0.5">
                <LockKeyhole className="h-4 w-4 text-secondary" />
              </div>
              <p className="leading-relaxed">
                Actualiza estados en tiempo real y notifica con mensajes claros usando toasts y
                animaciones.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3.5"
            >
              <div className="rounded-lg bg-primary/20 p-1.5 mt-0.5">
                <LockKeyhole className="h-4 w-4 text-secondary" />
              </div>
              <p className="leading-relaxed">El acceso está restringido a usuarios con rol administrador.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={handleClick}
              variant="secondary"
              size="lg"
              className="group w-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] h-12 font-semibold border border-white/10"
              disabled={isLoading}
            >
              {isAdmin ? "Ir al panel administrativo" : "Iniciar sesión como admin"}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

