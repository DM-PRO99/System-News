'use client';

import { motion } from 'framer-motion';
import { NovedadForm } from '@/components/novedad-form';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  ClipboardList, 
  FileText, 
  CheckCircle2, 
  Clock,
  Users,
  BarChart3,
  Building2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Badge pequeño arriba */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm"
            >
              <Zap className="h-4 w-4" />
              Gestión eficiente de novedades
            </Badge>
          </motion.div>

          {/* Título principal gigante */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-extrabold tracking-tight text-foreground md:text-7xl mb-4"
          >
            Novedades Punto de Información
          </motion.h1>

          {/* Subtítulo en gradiente */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent mb-6"
          >
            InfoMira Itagüí
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Sistema integral para el seguimiento y gestión de solicitudes
          </motion.p>

          {/* 3 badges outline con íconos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-2 rounded-lg border-primary/50 bg-card/50 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:border-primary transition-all"
            >
              <Zap className="h-4 w-4 text-primary" />
              Rápido y eficiente
            </Badge>
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-2 rounded-lg border-primary/50 bg-card/50 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:border-primary transition-all"
            >
              <Shield className="h-4 w-4 text-primary" />
              Seguro y confiable
            </Badge>
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-2 rounded-lg border-primary/50 bg-card/50 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:border-primary transition-all"
            >
              <TrendingUp className="h-4 w-4 text-primary" />
              Seguimiento en tiempo real
            </Badge>
          </motion.div>

          {/* Grid 3 columnas de estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
          >
            {[
              { value: '99.9%', label: 'Disponibilidad', icon: Shield },
              { value: '24/7', label: 'Soporte', icon: Clock },
              { value: '100%', label: 'Seguro', icon: CheckCircle2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-primary/30 bg-card/50 backdrop-blur-xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Card Principal CTA */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
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
            
            <CardContent className="relative p-8 md:p-12">
              {/* Ícono grande en gradiente */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <div className="rounded-2xl bg-gradient-to-br from-primary via-primary-light to-accent p-6 shadow-2xl shadow-primary/30">
                  <ClipboardList className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              {/* Título */}
              <h2 className="text-3xl font-extrabold text-center text-foreground mb-4">
                Registrar nueva novedad
              </h2>

              {/* Descripción */}
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Completa el formulario y nuestro equipo dará seguimiento a tu solicitud. 
                Todos los campos son obligatorios.
              </p>

              {/* Grid 2 columnas con mini-cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Cédula</div>
                      <div className="text-xs text-muted-foreground">Identificación</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Validación</div>
                      <div className="text-xs text-muted-foreground">Automática</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Botón grande gradiente */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mb-6"
              >
                <Button
                  asChild
                  className="w-full h-12 bg-gradient-to-r from-primary via-primary-light to-accent hover:from-primary/90 hover:via-primary-light/90 hover:to-accent/90 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all text-base font-bold"
                >
                  <Link href="#formulario">
                    Comenzar registro →
                  </Link>
                </Button>
              </motion.div>

              {/* Footer con Clock icon */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Tiempo estimado: 2 minutos</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Formulario de Novedad */}
      <section id="formulario" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <NovedadForm />
        </div>
      </section>

      {/* Sección Características */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Características del sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Colaboración en equipo',
                description: 'Trabajo conjunto para resolver novedades de manera eficiente y coordinada.',
              },
              {
                icon: BarChart3,
                title: 'Métricas inteligentes',
                description: 'Seguimiento y análisis de datos para mejorar continuamente el servicio.',
              },
              {
                icon: Shield,
                title: 'Seguridad garantizada',
                description: 'Protección de datos y cumplimiento de estándares de seguridad corporativa.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-primary/50 bg-card/50 backdrop-blur-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-6 flex justify-center"
                    >
                      <div className="rounded-full bg-gradient-to-br from-primary via-primary-light to-accent p-4 shadow-lg shadow-primary/30">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline Proceso */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Proceso de gestión
          </h2>

          <div className="relative">
            {/* Línea vertical gradiente */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-light to-accent transform md:-translate-x-1/2"></div>

            {/* Pasos */}
            {[
              {
                number: 1,
                title: 'Registra la novedad',
                description: 'Completa el formulario con tus datos y la descripción detallada de la novedad o solicitud que deseas reportar.',
                gradient: 'from-primary to-primary-light',
              },
              {
                number: 2,
                title: 'Seguimiento automático',
                description: 'El sistema asigna automáticamente un número de seguimiento y notifica al equipo administrativo para su revisión.',
                gradient: 'from-primary-light to-accent',
              },
              {
                number: 3,
                title: 'Resolución y cierre',
                description: 'Recibe actualizaciones en tiempo real sobre el estado de tu solicitud hasta su completa resolución.',
                gradient: 'from-accent to-primary',
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-16 md:mb-24 flex items-start gap-6 md:gap-8"
              >
                {/* Círculo numerado */}
                <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} text-white shadow-2xl shadow-primary/30 font-bold text-xl`}>
                  {step.number}
                </div>

                {/* Contenido */}
                <div className={`flex-1 pt-2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:ml-auto md:pl-8 md:max-w-md'}`}>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
