import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";

        const dishes = await prisma.dish.findMany({
            where: search ? {
                name: { contains: search }
            } : {},
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(dishes);
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener platos" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const data = await req.json();
        const { name, description, price, allergens, imageUrl } = data;

        if (!name) {
            return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
        }

        const dish = await prisma.dish.create({
            data: {
                name,
                description,
                price,
                allergens: allergens ? JSON.stringify(allergens) : "[]",
                imageUrl,
            },
        });

        return NextResponse.json(dish, { status: 201 });
    } catch (error) {
        console.error("Error creating dish:", error);
        return NextResponse.json({ error: "Error al crear el plato. ¿Es posible que el nombre ya exista?" }, { status: 500 });
    }
}
