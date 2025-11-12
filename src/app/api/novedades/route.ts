import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Novedad } from "@/models/Novedad";
import { novedadSchema } from "@/utils/validators";

export async function GET() {
  try {
    await connectDB();
    const novedades = await Novedad.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: novedades }, { status: 200 });
  } catch (error) {
    console.error("Error fetching novedades", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las novedades" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = novedadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();
    const novedad = await Novedad.create({
      ...parsed.data,
      estado: "Pendiente",
    });

    return NextResponse.json({ data: novedad }, { status: 201 });
  } catch (error) {
    console.error("Error creating novedad", error);
    return NextResponse.json(
      { error: "No se pudo registrar la novedad" },
      { status: 500 }
    );
  }
}

