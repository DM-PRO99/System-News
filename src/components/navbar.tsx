"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LogIn, LayoutDashboard, Home } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = session?.user?.role === "admin";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleLogin = async () => {
    if (pathname === "/login") {
      return;
    }
    router.push("/login");
  };

  const handleDashboard = () => {
    router.push("/admin");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/95 border-b border-border/50 shadow-sm">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 text-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
              Sistema de Novedades
            </Link>
            <p className="hidden text-xs font-medium text-muted-foreground sm:block mt-0.5">
              Gestiona novedades de forma ágil y centralizada
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          {isAdmin ? (
            <>
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2 border border-primary/10">
                <span className="text-sm font-semibold text-foreground">
                  Hola, <span className="text-primary">{session?.user?.name || "Administrador"}</span>
                </span>
              </div>
              {pathname !== "/admin" && (
                <Button onClick={handleDashboard} variant="secondary" className="gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <LayoutDashboard className="h-4 w-4" />
                  Panel
                </Button>
              )}
              <Button onClick={handleLogout} variant="destructive" className="gap-2 shadow-sm hover:shadow-md transition-shadow">
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} className="gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <LogIn className="h-4 w-4" />
              Ingresar
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 space-y-1">
              {isAdmin && (
                <div className="px-3 py-2.5 text-sm font-semibold text-foreground border-b border-border/50 bg-primary/5">
                  Hola, <span className="text-primary">{session?.user?.name || "Administrador"}</span>
                </div>
              )}
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onSelect={handleDashboard} className="cursor-pointer gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Panel administrativo
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event) => {
                  event.preventDefault();
                  void (isAdmin ? handleLogout() : handleLogin());
                }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isAdmin ? "logout" : "login"}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="flex w-full items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {isAdmin ? (
                        <>
                          <LogOut className="h-4 w-4" />
                          Cerrar sesión
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          Iniciar sesión
                        </>
                      )}
                    </span>
                    <Button size="sm" variant={isAdmin ? "destructive" : "default"}>
                      {isAdmin ? "Salir" : "Entrar"}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div className="flex w-full justify-center py-2">
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

