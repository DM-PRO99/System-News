import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { Usuario } from "@/models/Usuario";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          await connectDB();

          // Buscar usuario en la base de datos
          const user = await Usuario.findOne({
            email: credentials.email.toLowerCase().trim(),
          });

          if (user) {
            // Usuario encontrado en BD, verificar contraseña
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              return null;
            }

            return {
              id: user._id.toString(),
              name: user.nombre,
              email: user.email,
              role: user.role || "admin",
            } as const;
          }

          // Fallback: Si no hay usuario en BD, verificar variables de entorno (compatibilidad)
          if (ADMIN_EMAIL && ADMIN_PASSWORD_HASH) {
            const isEmailValid =
              credentials.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();

            if (isEmailValid) {
              const isPasswordValid = await bcrypt.compare(
                credentials.password,
                ADMIN_PASSWORD_HASH
              );

              if (isPasswordValid) {
                return {
                  id: "admin",
                  name: "Administrador",
                  email: ADMIN_EMAIL,
                  role: "admin",
                } as const;
              }
            }
          }

          return null;
        } catch (error) {
          console.error("Error en autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
};

