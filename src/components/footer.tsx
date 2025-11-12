"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-2 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Hecho por{" "}
            <span className="font-semibold text-foreground">
              Diego Alejandro Mena Ciceri
            </span>
          </p>
          <p className="text-xs text-muted-foreground/70">
            © {currentYear} Sistema de Novedades. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

