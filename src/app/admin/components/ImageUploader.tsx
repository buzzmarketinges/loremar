"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

interface ImageUploaderProps {
    label: string;
    currentImageUrl?: string;
    onUploadSuccess: (url: string) => void;
    placeholder?: string;
    linkedName?: string;
}

export default function ImageUploader({ label, currentImageUrl, onUploadSuccess, placeholder, linkedName }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const dishNameParam = linkedName ? `&dishName=${encodeURIComponent(linkedName)}` : "";

            // Usar client-side upload de Vercel Blob (evita límites de 4.5MB en serverless)
            const blob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: `/api/images/upload?${dishNameParam.slice(1)}`,
            });

            // Registrar la imagen en la base de datos con la URL definitiva
            const dbRes = await fetch("/api/images/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: blob.url, dishName: linkedName || null }),
            });

            if (dbRes.ok) {
                onUploadSuccess(blob.url);
            } else {
                // Aunque falle el registro en BD, la imagen está subida, usamos la URL igualmente
                onUploadSuccess(blob.url);
            }
        } catch (error: any) {
            console.error(error);
            alert("Error al subir la imagen: " + (error?.message || "Error desconocido"));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>{label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {currentImageUrl ? (
                    <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
                        <img src={currentImageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                ) : (
                    <div style={{ width: "80px", height: "80px", borderRadius: "8px", border: "1px dashed #555", display: "flex", justifyContent: "center", alignItems: "center", color: "#555", fontSize: "0.7rem" }}>
                        Sin imagen
                    </div>
                )}

                <div style={{ flex: 1 }}>
                    <label style={{
                        display: "inline-block",
                        padding: "0.6rem 1.2rem",
                        backgroundColor: uploading ? "#333" : "rgba(212, 175, 55, 0.1)",
                        color: "var(--gold)",
                        border: "1px solid var(--gold)",
                        borderRadius: "4px",
                        cursor: uploading ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        textAlign: "center"
                    }}>
                        {uploading ? "Subiendo..." : "+ Subir Imagen"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            disabled={uploading}
                        />
                    </label>
                    <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#888", margin: "0.4rem 0 0 0" }}>
                        {placeholder || "Sube una imagen para este elemento."}
                    </p>
                </div>
            </div>
        </div>
    );
}
