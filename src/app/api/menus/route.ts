import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const data = await req.json();
        const { name, type, price, blocks, slug, seoTitle, seoDescription, order, mainImage, menuDay } = data;

        if (!name || !type) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const menu = await prisma.menu.create({
            data: {
                name,
                type,
                price,
                slug,
                seoTitle,
                seoDescription,
                order: order ? parseInt(order) : 0,
                mainImage,
                menuDay: menuDay || null,
                blocks: {
                    create: blocks.map((block: any, index: number) => ({
                        order: index,
                        type: block.type,
                        content: JSON.stringify(block.content),
                    })),
                },
            },
        });

        return NextResponse.json(menu, { status: 201 });
    } catch (error) {
        console.error("Error creating menu:", error);
        return NextResponse.json({
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
