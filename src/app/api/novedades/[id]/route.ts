import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Novedad } from "@/models/Novedad";
import { novedadSchema } from "@/utils/validators";
import { Types } from "mongoose";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  return null;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await ensureAdmin();
  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const payload = await request.json();
    const parsed = novedadSchema.partial().safeParse(payload);

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

    const updated = await Novedad.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        updatedAt: new Date(),
      },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Novedad no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating novedad", error);
    return NextResponse.json(
      { error: "No se pudo actualizar la novedad" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await ensureAdmin();
  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Novedad.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Novedad no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Novedad eliminada" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting novedad", error);
    return NextResponse.json(
      { error: "No se pudo eliminar la novedad" },
      { status: 500 }
    );
  }
}

