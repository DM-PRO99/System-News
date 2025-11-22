'use client';

import { motion } from 'framer-motion';
import { NovedadForm } from '@/components/novedad-form';
import { AdminAccessCard } from '@/components/admin-access-card';
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section - Mejorado */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 px-5 py-2 text-sm font-semibold text-primary border border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4" />
          Gestión eficiente de novedades
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text"
        >
          Novedades Punto de Información
          <span className="block mt-2 bg-gradient-to-r from-primary via-indigo-600 to-secondary bg-clip-text text-transparent">
            InfoMira Itagui
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Aqui pueden registrar las  novedades.
  
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Zap, text: 'Rápido y eficiente' },
            { icon: Shield, text: 'Seguro y confiable' },
            { icon: TrendingUp, text: 'Seguimiento en tiempo real' },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground border border-border/50 backdrop-blur-sm"
            >
              <feature.icon className="h-4 w-4 text-primary" />
              {feature.text}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Main Content Grid - Rediseñado */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:gap-16 items-start">
        {/* Formulario - Más prominente */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-24"
        >
          <NovedadForm />
        </motion.div>

        {/* Admin Access Card - Mejorado */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AdminAccessCard />
        </motion.div>
      </div>
    </div>
  );
}
