export const dynamic = "force-dynamic";

import { Metadata } from "next";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AllergensLegend from "@/components/AllergensLegend";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DishImageModal from "@/components/DishImageModal";
import AllergenIcon from "@/components/AllergenIcon";
import Navbar from "@/components/Navbar";

const CATEGORIES = [
    "Tapas", "Carnes", "Pescados", "Mariscos", "Postres"
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const menu = await prisma.menu.findFirst({
        where: {
            OR: [
                { id: slug },
                { slug: slug }
            ]
        }
    });

    if (!menu) return { title: "Página no encontrada | LOREMAR" };

    return {
        title: menu.seoTitle || `${menu.name} | Restaurante LOREMAR`,
        description: menu.seoDescription || `Consulta nuestra carta de ${menu.name} en Restaurante LOREMAR.`,
        alternates: {
            canonical: `https://restaurantloremar.com/${menu.slug || menu.id}`,
        }
    };
}

export default async function MenuPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ category?: string }>
}) {
    const { slug } = await params;
    const { category: activeCategory } = await searchParams;

    const menu = await prisma.menu.findFirst({
        where: {
            OR: [
                { id: slug },
                { slug: slug }
            ]
        },
        include: {
            blocks: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!menu) return notFound();

    const allImages = await prisma.image.findMany();
    const reservationUrl = "https://reservas.restaurantloremar.com/";

    // Pre-process blocks for filtering if it's CARTA
    let filteredBlocks = menu.blocks;
    if (menu.type === "CARTA" && activeCategory && activeCategory !== "Todos") {
        filteredBlocks = menu.blocks.filter((block: any) => {
            if (block.type !== "DISH") return true;
            const content = JSON.parse(block.content);
            return content.category === activeCategory;
        });
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", padding: "0", position: "relative" }} className="fade-in">
            {/* Background Layer if mainImage exists */}
            {menu.mainImage && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    overflow: "hidden"
                }}>
                    <img
                        src={menu.mainImage}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "blur(10px) brightness(0.4)",
                            transform: "scale(1.1)"
                        }}
                    />
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.95) 100%)"
                    }} />
                </div>
            )}

            {/* Navbar with Fixed Title Visibility */}
            <div style={{ position: "relative", zIndex: 10 }}>
                <Navbar centerContent={
                    <h1 style={{
                        fontSize: "1.8rem",
                        fontFamily: "var(--font-serif)",
                        color: "var(--gold)",
                        textTransform: "lowercase",
                        margin: 0,
                        display: "inline-block"
                    }}>
                        {menu.name}
                    </h1>
                } />
            </div>

            {/* Main Content Area */}
            <div className="content-container" style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "center",
                padding: "120px 2rem 2rem 2rem", // Reduced bottom padding from 8rem to 2rem
                boxSizing: "border-box"
            }}>

                {/* Filter Buttons for CARTA */}
                {menu.type === "CARTA" && (
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginBottom: "2.5rem"
                    }}>
                        <Link
                            href={`/${slug}`}
                            style={{
                                padding: "0.4rem 1.2rem",
                                borderRadius: "30px",
                                border: `1px solid ${!activeCategory || activeCategory === "Todos" ? "var(--gold)" : "#222"}`,
                                color: !activeCategory || activeCategory === "Todos" ? "var(--gold)" : "#666",
                                textDecoration: "none",
                                fontSize: "0.85rem",
                                transition: "all 0.3s ease",
                                backgroundColor: !activeCategory || activeCategory === "Todos" ? "rgba(212, 175, 55, 0.1)" : "transparent"
                            }}
                        >
                            Todos
                        </Link>
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat}
                                href={`/${slug}?category=${cat}`}
                                style={{
                                    padding: "0.4rem 1.2rem",
                                    borderRadius: "30px",
                                    border: `1px solid ${activeCategory === cat ? "var(--gold)" : "#222"}`,
                                    color: activeCategory === cat ? "var(--gold)" : "#666",
                                    textDecoration: "none",
                                    fontSize: "0.85rem",
                                    transition: "all 0.3s ease",
                                    backgroundColor: activeCategory === cat ? "rgba(212, 175, 55, 0.1)" : "transparent"
                                }}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Price for fixed menus (compacted) */}
                {menu.price && menu.type === "MENU" && (
                    <div style={{ position: "relative", marginBottom: "2rem", display: "inline-block" }}>
                        <div style={{ width: "80px", height: "1px", backgroundColor: "var(--gold)", margin: "0 auto", opacity: 0.2 }} />
                        <div style={{
                            color: "var(--gold)",
                            fontSize: "2.2rem",
                            fontFamily: "var(--font-serif)",
                            fontWeight: "normal",
                            padding: "0.4rem 0"
                        }}>
                            {menu.price}{!menu.price.includes("€") && " €"}
                        </div>
                        <div style={{ width: "80px", height: "1px", backgroundColor: "var(--gold)", margin: "0 auto", opacity: 0.2 }} />
                    </div>
                )}

                {/* Blocks list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                    {filteredBlocks.map((block: any) => {
                        const content = JSON.parse(block.content);

                        if (block.type === "HEADER") {
                            return (
                                <div key={block.id} style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "1.2rem", marginBottom: "0.5rem" }}>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#333" }} />
                                    <h2 style={{
                                        fontSize: content.size === "XXL" ? "1.6rem" : content.size === "XL" ? "1.4rem" : "1.1rem",
                                        color: "var(--gold)",
                                        fontFamily: "var(--font-serif)",
                                        margin: 0,
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px"
                                    }}>
                                        {content.text}
                                    </h2>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#333" }} />
                                </div>
                            );
                        }

                        if (block.type === "PARAGRAPH") {
                            return (
                                <p key={block.id} style={{ color: "#666", fontSize: "0.85rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5 }}>
                                    {content.text}
                                </p>
                            );
                        }

                        if (block.type === "DISH") {
                            const dishImage = allImages.find((img: any) => img.linkedDishName?.toLowerCase() === content.name.toLowerCase()) || (content.imageUrl ? { url: content.imageUrl } : null);

                            return (
                                <div key={block.id} style={{
                                    textAlign: "left",
                                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                                    padding: "0.4rem 0"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <h3 style={{ fontSize: "1.1rem", color: "#ddd", fontWeight: "600", margin: 0 }}>{content.name}</h3>
                                            {dishImage && (
                                                <DishImageModal imageUrl={dishImage.url} altText={content.name} />
                                            )}
                                        </div>
                                        {(menu.type === "CARTA" || menu.type === "VINO") && content.price && (
                                            <span style={{
                                                color: "var(--gold)",
                                                fontFamily: "var(--font-serif)",
                                                fontSize: "1.2rem",
                                                fontWeight: "normal"
                                            }}>
                                                {content.price}{!String(content.price).includes("€") && " €"}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.1rem" }}>
                                        {content.description && (
                                            <p style={{ color: "#666", fontSize: "0.8rem", margin: 0, fontStyle: "italic" }}>{content.description}</p>
                                        )}
                                        {content.allergens && content.allergens.length > 0 && (
                                            <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                                                {content.allergens.map((allergen: string) => (
                                                    <AllergenIcon key={allergen} name={allergen} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                <p style={{ color: "#444", fontStyle: "italic", fontSize: "0.75rem", marginTop: "2rem" }}>
                    * Precios y disponibilidad sujetos a mercado
                </p>
            </div>

            {/* Footer Legend */}
            <div style={{ width: "100%", paddingBottom: "2rem" }}>
                <AllergensLegend />
            </div>

            {/* Bottom Sticky reservation button */}
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "1rem",
                backgroundColor: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(10px)",
                zIndex: 100,
                borderTop: "1px solid rgba(212, 175, 55, 0.1)"
            }}>
                <a
                    href={reservationUrl}
                    target="_blank"
                    style={{
                        display: "block",
                        width: "100%",
                        maxWidth: "500px",
                        margin: "0 auto",
                        backgroundColor: "var(--gold)",
                        color: "#000",
                        textAlign: "center",
                        padding: "0.8rem",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        borderRadius: "2px"
                    }}
                >
                    RESERVAR MESA
                </a>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .nav-link:hover {
                    opacity: 1 !important;
                    color: var(--gold) !important;
                }
                
                @media (max-width: 850px) {
                    .menu-title-header {
                        position: static !important;
                        transform: none !important;
                        order: 3;
                        width: 100% !important;
                        padding: 0.5rem 0 1rem 0;
                        background: rgba(10, 10, 10, 0.5);
                    }
                    .menu-title-header h1 {
                        font-size: 1.8rem !important;
                    }
                    nav > div {
                        flex-wrap: wrap;
                        height: auto !important;
                    }
                    .hide-mobile {
                        display: none !important;
                    }
                    .content-container {
                        padding-top: 150px !important;
                    }
                }

                @media (min-width: 851px) {
                    .nav-link.hide-mobile {
                        display: inline-block !important;
                    }
                }
            `}} />
        </div>
    );
}
