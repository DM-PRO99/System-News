"use client";

import { useState, useTransition, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, LogIn, AlertCircle, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values: LoginValues) => {
    setFormError(null);
    startTransition(async () => {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.error) {
        setFormError("Credenciales inválidas. Verifica tu correo y contraseña.");
        toast.error("Error de autenticación", {
          description: "Las credenciales ingresadas no son correctas.",
        });
        return;
      }

      toast.success("Bienvenido", {
        description: "Acceso administrativo concedido.",
      });
      router.push("/admin");
    });
  };

  const onRegisterSubmit = async (values: RegisterValues) => {
    setFormError(null);
    setIsRegistering(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Error al registrar usuario");
        toast.error("Error en el registro", {
          description: data.error || "Intenta nuevamente.",
        });
        return;
      }

      toast.success("Usuario registrado exitosamente", {
        description: "Tu cuenta ha sido creada como administrador. Ahora puedes iniciar sesión.",
      });

      // Cambiar a modo login y pre-llenar el email
      setIsRegisterMode(false);
      loginForm.setValue("email", values.email);
      registerForm.reset();
    } catch (error) {
      setFormError("Error al conectar con el servidor");
      toast.error("Error de conexión", {
        description: "Intenta nuevamente más tarde.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card className="relative overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur dark:bg-slate-900/70">
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15),_transparent_60%)]"
            animate={{ opacity: [0.75, 0.95, 0.75] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <CardHeader className="relative space-y-3">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-foreground">
              {isRegisterMode ? (
                <>
                  <UserPlus className="h-6 w-6 text-primary" />
                  Registro de administrador
                </>
              ) : (
                <>
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Ingreso administrativo
                </>
              )}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isRegisterMode
                ? "Crea tu cuenta de administrador para acceder al panel de gestión."
                : "Inicia sesión con tus credenciales para acceder al panel de gestión de novedades."}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <AnimatePresence mode="wait">
              {isRegisterMode ? (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  noValidate
                >
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      {...registerForm.register("nombre")}
                      aria-invalid={registerForm.formState.errors.nombre ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {registerForm.formState.errors.nombre && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {registerForm.formState.errors.nombre.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@correo.com"
                      autoComplete="email"
                      {...registerForm.register("email")}
                      aria-invalid={registerForm.formState.errors.email ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {registerForm.formState.errors.email && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {registerForm.formState.errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      {...registerForm.register("password")}
                      aria-invalid={registerForm.formState.errors.password ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {registerForm.formState.errors.password && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {registerForm.formState.errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      {...registerForm.register("confirmPassword")}
                      aria-invalid={registerForm.formState.errors.confirmPassword ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {registerForm.formState.errors.confirmPassword && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {registerForm.formState.errors.confirmPassword.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary via-indigo-500 to-secondary text-base font-semibold shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
                    disabled={!registerForm.formState.isValid || isRegistering}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    {isRegistering ? "Registrando..." : "Registrarse como administrador"}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  noValidate
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@empresa.com"
                      autoComplete="email"
                      {...loginForm.register("email")}
                      aria-invalid={loginForm.formState.errors.email ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {loginForm.formState.errors.email && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {loginForm.formState.errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      {...loginForm.register("password")}
                      aria-invalid={loginForm.formState.errors.password ? "true" : "false"}
                    />
                    <AnimatePresence>
                      {loginForm.formState.errors.password && (
                        <motion.p
                          className="text-sm text-destructive"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {loginForm.formState.errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {(formError || authError) && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {formError ?? "Credenciales inválidas. Inténtalo nuevamente."}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary via-indigo-500 to-secondary text-base font-semibold shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
                    disabled={!loginForm.formState.isValid || loginForm.formState.isSubmitting || isPending}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    {loginForm.formState.isSubmitting || isPending ? "Validando..." : "Ingresar"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            <Separator className="my-6" />

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setFormError(null);
                  loginForm.reset();
                  registerForm.reset();
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isRegisterMode
                  ? "¿Ya tienes cuenta? Inicia sesión"
                  : "¿No tienes cuenta? Regístrate como administrador"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center px-4 py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cargando...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

