import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Registra en BD una imagen ya subida a Vercel Blob
export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { url, dishName } = await request.json();

        if (!url) {
            return NextResponse.json({ error: "URL requerida" }, { status: 400 });
        }

        const image = await prisma.image.create({
            data: {
                url,
                linkedDishName: dishName || null,
            },
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error: any) {
        console.error("Register image error:", error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
