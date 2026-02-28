"use client";

import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImageCard({ img }: { img: any }) {
    const [isFavorite, setIsFavorite] = useState(img.isFavorite);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const toggleFavorite = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/images/${img.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isFavorite: !isFavorite })
            });
            if (res.ok) {
                setIsFavorite(!isFavorite);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async () => {
        if (!confirm("¿Seguro que quieres eliminar esta imagen?")) return;
        try {
            const res = await fetch(`/api/images/${img.id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "var(--surface)",
            position: "relative"
        }}>
            <img src={img.url} alt={img.linkedDishName || "Imagen"} style={{ width: "100%", height: "150px", objectFit: "cover" }} />

            <button
                onClick={toggleFavorite}
                disabled={loading}
                style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isFavorite ? "var(--gold)" : "#fff",
                    transition: "all 0.2s"
                }}
            >
                <Star size={18} fill={isFavorite ? "var(--gold)" : "none"} />
            </button>

            <div style={{ padding: "1rem" }}>
                <p style={{ margin: "0 0 0.5rem 0", color: "var(--gold)", fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase" }}>Asignado a:</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#ccc" }}>
                        {img.linkedDishName || <span style={{ color: "#555", fontStyle: "italic" }}>Sin asignar</span>}
                    </p>
                    <button
                        onClick={deleteImage}
                        style={{ background: "none", border: "none", color: "#ff4444", cursor: "pointer", opacity: 0.6 }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseOut={(e) => e.currentTarget.style.opacity = "0.6"}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
