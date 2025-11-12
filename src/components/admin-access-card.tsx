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
      <Card className="relative overflow-hidden border-none bg-slate-900/90 text-slate-100 shadow-xl">
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-primary/70 via-indigo-500/60 to-secondary/70 opacity-80"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <CardHeader className="relative space-y-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="rounded-full bg-primary/20 p-2"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
            >
              <ShieldCheck className="h-7 w-7 text-secondary" />
            </motion.div>
            <CardTitle className="text-2xl font-semibold">Acceso administrativo</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Consulta y gestiona todas las novedades registradas. Requiere credenciales autorizadas.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-4 w-4 text-secondary" />
              <p>
                Visualiza el tablero con estadísticas por estado, filtros avanzados y una vista
                detallada de cada novedad.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-4 w-4 text-secondary" />
              <p>
                Actualiza estados en tiempo real y notifica con mensajes claros usando toasts y
                animaciones.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-4 w-4 text-secondary" />
              <p>El acceso está restringido a usuarios con rol administrador.</p>
            </div>
          </div>

          <Button
            onClick={handleClick}
            variant="secondary"
            size="lg"
            className="group w-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            disabled={isLoading}
          >
            {isAdmin ? "Ir al panel administrativo" : "Iniciar sesión como admin"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

