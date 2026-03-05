"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

export default function ImageUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [dishName, setDishName] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (dishName.length > 1) {
            fetch(`/api/dishes/search?q=${dishName}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch(() => setSuggestions([]));
        } else {
            setSuggestions([]);
        }
    }, [dishName]);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Selecciona un archivo");

        setUploading(true);
        try {
            const dishNameParam = dishName ? `dishName=${encodeURIComponent(dishName)}` : "";

            // Client-side upload directo a Vercel Blob (sin límite de 4.5MB)
            const blob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: `/api/images/upload${dishNameParam ? `?${dishNameParam}` : ""}`,
            });

            // Registrar la URL en la base de datos
            await fetch("/api/images/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: blob.url, dishName: dishName || null }),
            });

            setFile(null);
            setDishName("");
            setShowForm(false);
            router.refresh();
        } catch (error: any) {
            console.error(error);
            alert("Error al subir la imagen: " + (error?.message || "Error desconocido"));
        } finally {
            setUploading(false);
        }
    };

    if (!showForm) {
        return (
            <button
                onClick={() => setShowForm(true)}
                style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "var(--gold)",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background 0.2s"
                }}
            >
                + Subir Imagen
            </button>
        );
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(5px)"
        }}>
            <form
                onSubmit={handleUpload}
                style={{
                    backgroundColor: "var(--surface)",
                    padding: "2rem",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                }}
                className="fade-in"
            >
                <h2 style={{ color: "var(--gold)", margin: 0 }}>Subir Imagen</h2>

                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#ccc" }}>Seleccionar archivo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        style={{ color: "#fff" }}
                        required
                    />
                </div>

                <div style={{ position: "relative" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#ccc" }}>Vincular con plato (opcional)</label>
                    <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        placeholder="Escriba nombre del plato..."
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            borderRadius: "4px",
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "#fff"
                        }}
                    />
                    {suggestions.length > 0 && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "100%",
                            backgroundColor: "#222",
                            border: "1px solid #444",
                            zIndex: 10,
                            maxHeight: "150px",
                            overflowY: "auto"
                        }}>
                            {suggestions.map((s) => (
                                <div
                                    key={s}
                                    onClick={() => { setDishName(s); setSuggestions([]); }}
                                    style={{ padding: "0.8rem", cursor: "pointer", borderBottom: "1px solid #333" }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333"}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        style={{
                            flex: 1,
                            padding: "0.8rem",
                            backgroundColor: "transparent",
                            color: "#ccc",
                            border: "1px solid #555",
                            borderRadius: "4px"
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        style={{
                            flex: 1,
                            padding: "0.8rem",
                            backgroundColor: "var(--gold)",
                            color: "#000",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            opacity: uploading ? 0.6 : 1
                        }}
                    >
                        {uploading ? "Subiendo..." : "Subir"}
                    </button>
                </div>
            </form>
        </div>
    );
}
