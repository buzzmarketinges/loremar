export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ImageUploadForm from "./ImageUploadForm";
import ImageCard from "./ImageCard";

export default async function ImagesPage() {
    const images = await prisma.image.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>Gestión de Imágenes</h1>
                <ImageUploadForm />
            </div>

            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
                Marca con una estrella las imágenes que quieras que aparezcan en la sección "Imágenes de nuestros platos" de la página de inicio.
            </p>

            {images.length === 0 ? (
                <p style={{ color: "#888" }}>No hay imágenes almacenadas.</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                    {images.map((img: any) => (
                        <ImageCard key={img.id} img={img} />
                    ))}
                </div>
            )}
        </div>
    );
}
