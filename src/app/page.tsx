'use client';

import { motion } from 'framer-motion';
import { NovedadForm } from '@/components/novedad-form';
import { AdminAccessCard } from '@/components/admin-access-card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Gestión eficiente de novedades
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Centraliza novedades y peticiones con un flujo dinámico y transparente
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Registra novedades en segundos y dale seguimiento en un panel administrativo moderno, con
          indicadores, filtros inteligentes y animaciones intuitivas.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <NovedadForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <AdminAccessCard />
          <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg shadow-primary/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-foreground">
              ¿Qué puedes esperar?
            </h2>
            <Separator className="my-4" />
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                Seguimiento en tiempo real con estados visuales: pendiente, en proceso y finalizada.
              </li>
              <li>
                Panel inteligente con filtros, búsqueda por cédula o nombre y tarjetas con totales.
              </li>
              <li>
                Experiencia moderna: animaciones suaves, modo oscuro y toasts informativos.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
