import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q") || "";

        if (!query) {
            return NextResponse.json([]);
        }

        // Buscamos en el contenido JSON de los bloques tipo DISH
        const menuBlocks = await prisma.menuBlock.findMany({
            where: {
                type: "DISH",
                content: {
                    contains: query
                }
            },
            select: {
                content: true
            }
        });

        const dishNames = new Set<string>();
        menuBlocks.forEach((block: any) => {
            try {
                const content = JSON.parse(block.content);
                if (content.name && content.name.toLowerCase().includes(query.toLowerCase())) {
                    dishNames.add(content.name);
                }
            } catch (e) {
                // Ignorar errores de parseo
            }
        });

        return NextResponse.json(Array.from(dishNames).slice(0, 10));
    } catch (error) {
        console.error("Dish search error:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
