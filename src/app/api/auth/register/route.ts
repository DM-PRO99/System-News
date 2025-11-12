import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Usuario } from "@/models/Usuario";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    await connectDB();

    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ email: validatedData.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Este correo electrónico ya está registrado" },
        { status: 400 }
      );
    }

    // Crear nuevo usuario (automáticamente será admin por el default en el schema)
    const newUser = new Usuario({
      email: validatedData.email.toLowerCase().trim(),
      password: validatedData.password, // Se hasheará automáticamente en el pre-save hook
      nombre: validatedData.nombre.trim(),
      role: "admin", // Todos los usuarios registrados son admin
    });

    await newUser.save();

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente como administrador",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario. Intenta nuevamente." },
      { status: 500 }
    );
  }
}

