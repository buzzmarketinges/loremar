import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Este endpoint maneja el flujo de client-side upload de Vercel Blob
export async function POST(request: Request): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = (await request.json()) as HandleUploadBody;
    const { searchParams } = new URL(request.url);
    const dishName = searchParams.get('dishName') || null;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                // Aquí podríamos validar el tipo de archivo si quisiéramos
                return {
                    allowedContentTypes: ['image/*'],
                    maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
                };
            },
            onUploadCompleted: async ({ blob }) => {
                // Guardar en la base de datos cuando Vercel Blob confirme la subida
                try {
                    await prisma.image.create({
                        data: {
                            url: blob.url,
                            linkedDishName: dishName,
                        },
                    });
                } catch (err) {
                    console.error("DB Error after upload:", err);
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error: any) {
        console.error("Upload token error:", error);
        return NextResponse.json({ error: error?.message }, { status: 400 });
    }
}
