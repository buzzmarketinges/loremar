import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs';
import path from 'path';

export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const dishName = searchParams.get('dishName');

    if (!filename || !request.body) {
        return NextResponse.json({ error: "Archivo faltante" }, { status: 400 });
    }

    try {
        let url = "";

        if (process.env.USE_LOCAL_STORAGE === "true") {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const arrayBuffer = await request.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const safeFilename = `${Date.now()}-${filename}`;
            const filePath = path.join(uploadDir, safeFilename);
            fs.writeFileSync(filePath, buffer);
            url = `/uploads/${safeFilename}`;
        } else {
            const blob = await put(filename, request.body, {
                access: 'public',
            });
            url = blob.url;
        }

        // Guardar en la base de datos el registro de la imagen
        const image = await prisma.image.create({
            data: {
                url: url,
                linkedDishName: dishName || null,
            }
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Error subiendo el archivo" }, { status: 500 });
    }
}
