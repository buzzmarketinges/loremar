"use client";

import { useState } from "react";
import Link from "next/link";

export default function MenuTabs({ menus }: { menus: any[] }) {
    const [activeTab, setActiveTab] = useState<"MENU" | "CARTA" | "VINO">("MENU");

    const filteredMenus = menus.filter(m => m.type === activeTab);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <button
                    onClick={() => setActiveTab("MENU")}
                    className={`pill-btn ${activeTab === "MENU" ? "active" : ""}`}
                    style={{
                        backgroundColor: activeTab === "MENU" ? "rgba(212,175,55,0.15)" : "transparent",
                        border: `1px solid ${activeTab === "MENU" ? "var(--gold)" : "#444"}`,
                        color: activeTab === "MENU" ? "var(--gold)" : "#888",
                        padding: "0.6rem 2rem",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    Nuestros Menús
                </button>
                <button
                    onClick={() => setActiveTab("CARTA")}
                    className={`pill-btn ${activeTab === "CARTA" ? "active" : ""}`}
                    style={{
                        backgroundColor: activeTab === "CARTA" ? "rgba(212,175,55,0.15)" : "transparent",
                        border: `1px solid ${activeTab === "CARTA" ? "var(--gold)" : "#444"}`,
                        color: activeTab === "CARTA" ? "var(--gold)" : "#888",
                        padding: "0.6rem 2rem",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    Carta
                </button>
                <button
                    onClick={() => setActiveTab("VINO")}
                    className={`pill-btn ${activeTab === "VINO" ? "active" : ""}`}
                    style={{
                        backgroundColor: activeTab === "VINO" ? "rgba(212,175,55,0.15)" : "transparent",
                        border: `1px solid ${activeTab === "VINO" ? "var(--gold)" : "#444"}`,
                        color: activeTab === "VINO" ? "var(--gold)" : "#888",
                        padding: "0.6rem 2rem",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    Vinos
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "4rem auto 0 auto" }}>
                {filteredMenus.length === 0 ? (
                    <p style={{ color: "#888", textAlign: "center", gridColumn: "1/-1" }}>Aún no hay opciones en esta categoría. Vuelve pronto.</p>
                ) : (
                    filteredMenus.map((menu: any, index: number) => (
                        <Link key={menu.id} href={`/${menu.slug || menu.id}`} className="menu-card" style={{
                            height: "450px",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "2.5rem",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "var(--surface)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            backgroundImage: menu.mainImage ? `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,1) 60%), url('${menu.mainImage}')` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div style={{
                                position: "absolute",
                                top: "2.5rem",
                                right: "2.5rem",
                                color: "rgba(212,175,55,0.1)",
                                fontSize: "5rem",
                                fontWeight: "bold",
                                fontFamily: "var(--font-serif)"
                            }}>
                                0{index + 1}
                            </div>
                            <h3 style={{ fontSize: "2.5rem", color: "#fff", marginBottom: "0.5rem", textShadow: "0 2px 15px rgba(0,0,0,0.8)" }}>{menu.name}</h3>
                            <div style={{
                                marginTop: "1.5rem",
                                display: "inline-block",
                                color: "var(--gold)",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                letterSpacing: "1px"
                            }}>
                                VER MÁS →
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
