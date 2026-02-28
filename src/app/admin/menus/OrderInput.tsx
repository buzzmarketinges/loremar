"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderInputProps {
    menuId: string;
    initialOrder: number;
}

export default function OrderInput({ menuId, initialOrder }: OrderInputProps) {
    const [order, setOrder] = useState(initialOrder.toString());
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleBlur = async () => {
        if (order === initialOrder.toString()) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/menus/${menuId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Error al actualizar el orden");
                setOrder(initialOrder.toString());
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
            setOrder(initialOrder.toString());
        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--gold)", fontSize: "0.8rem", opacity: 0.5 }}>#</span>
            <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={isSaving}
                style={{
                    width: "50px",
                    padding: "0.3rem",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    color: "var(--foreground)",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    cursor: isSaving ? "wait" : "text",
                    outline: "none",
                    transition: "all 0.2s"
                }}
                className="order-input"
            />
            {isSaving && <span style={{ fontSize: "0.7rem", color: "var(--gold)" }}>...</span>}
            <style jsx>{`
                .order-input:focus {
                    border-color: var(--gold);
                    background-color: rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    );
}
