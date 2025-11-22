"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Logo + Nombre + Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary via-primary-light to-accent p-2 text-white shadow-lg shadow-primary/30">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-foreground">Sistema de Novedades</div>
                <div className="text-xs text-muted-foreground">InfoMira Itagüí</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70">
              © {currentYear} InfoMira Itagüí. Todos los derechos reservados.
            </p>
          </div>

          {/* Links: Soporte, Ayuda */}
          <div className="flex flex-col items-center md:items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="#soporte" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Soporte
              </Link>
              <Link 
                href="#ayuda" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ayuda
              </Link>
            </div>
          </div>

          {/* Información adicional */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Hecho por{" "}
              <span className="font-semibold text-foreground">
                Diego Alejandro Mena Ciceri
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

