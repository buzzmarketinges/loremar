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

    if (!filename) {
        return NextResponse.json({ error: "Archivo faltante" }, { status: 400 });
    }

    try {
        let url = "";

        // Leer el cuerpo como buffer (más compatible con Vercel serverless)
        const arrayBuffer = await request.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (buffer.byteLength === 0) {
            return NextResponse.json({ error: "El archivo está vacío" }, { status: 400 });
        }

        const contentType = request.headers.get('content-type') || 'application/octet-stream';

        if (process.env.BLOB_READ_WRITE_TOKEN) {
            // Vercel Blob (producción)
            const blob = await put(filename, buffer, {
                access: 'public',
                contentType: contentType,
            });
            url = blob.url;
        } else {
            // Filesystem local (desarrollo sin token de Vercel)
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
            const filePath = path.join(uploadDir, safeFilename);
            fs.writeFileSync(filePath, buffer);
            url = `/uploads/${safeFilename}`;
        }

        // Guardar en la base de datos el registro de la imagen
        const image = await prisma.image.create({
            data: {
                url: url,
                linkedDishName: dishName || null,
            }
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Error subiendo el archivo: " + error?.message }, { status: 500 });
    }
}
