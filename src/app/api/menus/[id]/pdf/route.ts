export const maxDuration = 60;

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    renderToBuffer,
    Font,
} from "@react-pdf/renderer";

// Registrar fuentes de Google Fonts
Font.register({
    family: "Playfair",
    fonts: [
        { src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff2", fontWeight: 700 },
        { src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdiumo.woff2", fontStyle: "italic" },
    ],
});

Font.register({
    family: "Lato",
    fonts: [
        { src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2", fontWeight: 300 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXg.woff2", fontWeight: 400 },
    ],
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 50,
        fontFamily: "Lato",
        color: "#2c3e50",
    },
    card: {
        borderWidth: 2,
        borderColor: "#d4af37",
        borderStyle: "solid",
        padding: 40,
        flex: 1,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontFamily: "Playfair",
        fontWeight: 700,
        fontSize: 32,
        color: "#b8860b",
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: "Playfair",
        fontStyle: "italic",
        fontSize: 14,
        color: "#7f8c8d",
        textAlign: "center",
    },
    ornament: {
        fontSize: 20,
        color: "#d4af37",
        textAlign: "center",
        marginVertical: 15,
    },
    sectionTitle: {
        fontFamily: "Playfair",
        fontWeight: 700,
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 3,
        color: "#2c3e50",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        padding: 0,
    },
    sectionLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#d4af37",
        marginHorizontal: 40,
        marginBottom: 10,
    },
    dishItem: {
        marginBottom: 10,
        alignItems: "center",
    },
    dishRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    dishName: {
        fontWeight: 400,
        fontSize: 14,
        color: "#2c3e50",
        textAlign: "center",
    },
    dishPrice: {
        fontFamily: "Playfair",
        fontStyle: "italic",
        fontSize: 14,
        color: "#b8860b",
    },
    dishDesc: {
        fontSize: 11,
        color: "#7f8c8d",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 2,
    },
    paragraph: {
        fontSize: 13,
        color: "#34495e",
        lineHeight: 1.6,
        textAlign: "center",
        marginVertical: 10,
    },
    footer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee",
        paddingTop: 10,
        alignItems: "center",
    },
    footerText: {
        fontSize: 10,
        color: "#bdc3c7",
        textAlign: "center",
    },
});

function MenuDocument({ menu }: { menu: any }) {
    const year = new Date().getFullYear();
    const priceLabel = menu.type === "MENU" && menu.price ? `${menu.price}€` : "Experiencia Gastronómica";

    return React.createElement(
        Document,
        null,
        React.createElement(
            Page,
            { size: "A4", style: styles.page },
            React.createElement(
                View,
                { style: styles.card },
                // Header
                React.createElement(
                    View,
                    { style: styles.header },
                    React.createElement(Text, { style: styles.title }, menu.name),
                    React.createElement(Text, { style: styles.subtitle }, priceLabel)
                ),
                React.createElement(Text, { style: styles.ornament }, "❦"),
                // Blocks
                ...menu.blocks.map((block: any, i: number) => {
                    const content = JSON.parse(block.content);
                    if (block.type === "HEADER") {
                        return React.createElement(
                            View,
                            { key: i },
                            React.createElement(Text, { style: styles.sectionTitle }, content.text),
                            React.createElement(View, { style: styles.sectionLine })
                        );
                    } else if (block.type === "PARAGRAPH") {
                        return React.createElement(Text, { key: i, style: styles.paragraph }, content.text);
                    } else if (block.type === "DISH") {
                        return React.createElement(
                            View,
                            { key: i, style: styles.dishItem },
                            React.createElement(
                                View,
                                { style: styles.dishRow },
                                React.createElement(Text, { style: styles.dishName }, content.name),
                                content.price
                                    ? React.createElement(Text, { style: styles.dishPrice }, ` ${content.price}€`)
                                    : null
                            ),
                            content.description
                                ? React.createElement(Text, { style: styles.dishDesc }, content.description)
                                : null
                        );
                    }
                    return null;
                }),
                // Footer
                React.createElement(
                    View,
                    { style: styles.footer },
                    React.createElement(Text, { style: styles.footerText }, `LOREMAR  |  ${year}`)
                )
            )
        )
    );
}

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
                blocks: { orderBy: { order: "asc" } },
            },
        });

        if (!menu) {
            return NextResponse.json({ error: "Menú no encontrado" }, { status: 404 });
        }

        const element = React.createElement(MenuDocument, { menu }) as any;
        const pdfBuffer = await renderToBuffer(element);

        return new Response(new Uint8Array(pdfBuffer), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${menu.name.replace(/\s+/g, "_")}.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF generation error:", error);
        const msg = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Error al generar el PDF: " + msg }, { status: 500 });
    }
}
