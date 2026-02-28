"use client";

import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

interface GalleryImage {
    id: string;
    url: string;
    linkedDishName: string | null;
}

export default function GalleryItem({ img }: { img: GalleryImage }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="gallery-item-card"
                onClick={() => setIsOpen(true)}
                style={{
                    position: "relative",
                    height: "450px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,1) 85%), url('${img.url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2.5rem",
                    border: "none",
                    backgroundColor: "var(--surface)"
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                    <div style={{ flex: 1 }}>
                        {img.linkedDishName && (
                            <h3 style={{
                                color: "#fff",
                                fontFamily: "var(--font-serif)",
                                fontSize: "1.8rem",
                                margin: 0,
                                lineHeight: "1.2"
                            }}>
                                {img.linkedDishName}
                            </h3>
                        )}
                        <span style={{
                            display: "block",
                            color: "var(--gold)",
                            fontSize: "0.75rem",
                            marginTop: "0.8rem",
                            letterSpacing: "2px",
                            fontWeight: "600"
                        }}>
                            VER PLATO →
                        </span>
                    </div>
                    <div className="maximize-container" style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(212,175,55,0.3)",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                        opacity: 1, // Visible by default
                        transform: "translateY(0)", // No initial translation
                        color: "var(--gold)"
                    }}>
                        <Maximize2 size={20} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.95)",
                        zIndex: 10000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        backdropFilter: "blur(10px)",
                        animation: "fadeIn 0.3s ease"
                    }}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: "absolute",
                            top: "2rem",
                            right: "2rem",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            zIndex: 10001
                        }}
                    >
                        <X size={40} />
                    </button>

                    <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "1200px", width: "100%", height: "80vh", position: "relative" }}>
                        <img
                            src={img.url}
                            alt={img.linkedDishName || "Plato Loremar"}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                        {img.linkedDishName && (
                            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                                <h3 style={{ color: "var(--gold)", fontSize: "2rem", fontFamily: "var(--font-serif)" }}>{img.linkedDishName}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .gallery-item-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                .gallery-item-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                }
                .gallery-item-card:hover .maximize-container {
                    background-color: var(--gold) !important;
                }
                .gallery-item-card:hover .maximize-container svg {
                    color: #000 !important;
                }
            `}} />
        </>
    );
}
