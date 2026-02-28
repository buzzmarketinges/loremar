import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { isFavorite } = body;

        const updatedImage = await prisma.image.update({
            where: { id },
            data: { isFavorite }
        });

        return NextResponse.json(updatedImage);
    } catch (error) {
        console.error("Error updating image:", error);
        return NextResponse.json({ error: "Error al actualizar la imagen" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        await prisma.image.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Imagen eliminada" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ error: "Error al eliminar la imagen" }, { status: 500 });
    }
}
