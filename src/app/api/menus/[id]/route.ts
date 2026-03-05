import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const menu = await prisma.menu.findUnique({
            where: { id },
            include: {
                blocks: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!menu) {
            return NextResponse.json({ error: "Menú no encontrado" }, { status: 404 });
        }

        return NextResponse.json(menu);
    } catch (error) {
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
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
        const { name, type, price, blocks, slug, seoTitle, seoDescription, order, mainImage, menuDay } = data;

        if (blocks) {
            // Actualización completa (transaccional): borramos bloques viejos y creamos nuevos
            const updatedMenu = await prisma.$transaction(async (tx: any) => {
                await tx.menuBlock.deleteMany({ where: { menuId: id } });
                return await tx.menu.update({
                    where: { id },
                    data: {
                        name,
                        type,
                        price,
                        slug,
                        seoTitle,
                        seoDescription,
                        order: order !== undefined ? parseInt(order) : undefined,
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
            });
            return NextResponse.json(updatedMenu);
        } else {
            // Actualización parcial (solo campos del menú)
            const updatedMenu = await prisma.menu.update({
                where: { id },
                data: {
                    name,
                    type,
                    price,
                    slug,
                    seoTitle,
                    seoDescription,
                    order: order !== undefined ? parseInt(order) : undefined,
                    mainImage,
                    menuDay: menuDay || null,
                },
            });
            return NextResponse.json(updatedMenu);
        }
    } catch (error) {
        console.error("Update error details:", error);
        return NextResponse.json({ error: "Error al actualizar el menú", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        await prisma.menu.delete({ where: { id } });
        return NextResponse.json({ message: "Eliminado con éxito" });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }
}
