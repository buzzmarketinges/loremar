import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://restaurantloremar.com";

    // Rutas estáticas clave
    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/#experiencia`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#cartas`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#galeria`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#ubicacion`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ];

    try {
        // Obtener los menús activos (slugs) - Carta, Vinos, Menús Diarios, etc.
        const menus = await prisma.menu.findMany({
            select: {
                slug: true,
                updatedAt: true,
            },
            where: {
                slug: { not: null },
            },
        });

        const dynamicRoutes = menus.map((menu) => ({
            url: `${baseUrl}/${menu.slug}`,
            lastModified: menu.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        }));

        return [...staticRoutes, ...dynamicRoutes];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return staticRoutes;
    }
}
