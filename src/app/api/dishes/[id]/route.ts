import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const dish = await prisma.dish.findUnique({ where: { id } });
        if (!dish) return NextResponse.json({ error: "Plato no encontrado" }, { status: 404 });
        return NextResponse.json(dish);
    } catch (error) {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const data = await req.json();
        const { name, description, price, allergens, imageUrl } = data;

        const updatedDish = await prisma.dish.update({
            where: { id },
            data: {
                name,
                description,
                price,
                allergens: allergens ? JSON.stringify(allergens) : undefined,
                imageUrl,
            },
        });

        return NextResponse.json(updatedDish);
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        await prisma.dish.delete({ where: { id } });
        return NextResponse.json({ message: "Eliminado con éxito" });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }
}
