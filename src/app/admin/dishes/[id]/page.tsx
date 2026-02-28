"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "../../components/ImageUploader";

const ALLERGENS = [
    "Gluten", "Crustáceos", "Huevos", "Pescado", "Frutos secos",
    "Soja", "Lácteos", "Apio", "Mostaza", "Sésamo", "Sulfitos", "Moluscos"
];

export default function EditDishPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const res = await fetch(`/api/dishes/${id}`);
                if (res.ok) {
                    const dish = await res.json();
                    setName(dish.name);
                    setDescription(dish.description || "");
                    setPrice(dish.price || "");
                    setImageUrl(dish.imageUrl || "");
                    setSelectedAllergens(JSON.parse(dish.allergens || "[]"));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDish();
    }, [id]);

    const toggleAllergen = (allergen: string) => {
        setSelectedAllergens(prev =>
            prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/dishes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    imageUrl,
                    allergens: selectedAllergens
                }),
            });

            if (res.ok) {
                router.push("/admin/dishes");
                router.refresh();
            } else {
                alert("Error al actualizar el plato");
            }
        } catch (err) {
            alert("Error de conexión");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("¿Seguro que quieres eliminar este plato?")) return;

        try {
            const res = await fetch(`/api/dishes/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.push("/admin/dishes");
                router.refresh();
            }
        } catch (err) {
            alert("Error al eliminar");
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>Editar Plato</h1>
                <button
                    onClick={handleDelete}
                    style={{ backgroundColor: "#ff4444", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                    Eliminar
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ padding: "1.5rem", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Nombre del Plato</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                            required
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                        <div>
                            <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Precio</label>
                            <input
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                            />
                        </div>
                        <div style={{ alignSelf: "end" }}>
                            <ImageUploader
                                label="Imagen del Plato"
                                currentImageUrl={imageUrl}
                                onUploadSuccess={setImageUrl}
                                linkedName={name}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Descripción</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", minHeight: "100px" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Alérgenos</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {ALLERGENS.map(allergen => (
                                <button
                                    key={allergen}
                                    type="button"
                                    onClick={() => toggleAllergen(allergen)}
                                    style={{
                                        padding: "0.4rem 0.8rem",
                                        borderRadius: "4px",
                                        fontSize: "0.8rem",
                                        backgroundColor: selectedAllergens.includes(allergen) ? "var(--gold)" : "rgba(255,255,255,0.05)",
                                        color: selectedAllergens.includes(allergen) ? "#000" : "#ccc",
                                        border: "1px solid",
                                        borderColor: selectedAllergens.includes(allergen) ? "var(--gold)" : "var(--border)",
                                        cursor: "pointer"
                                    }}
                                >
                                    {allergen}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        padding: "1rem",
                        backgroundColor: "var(--gold)",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.7 : 1
                    }}
                >
                    {saving ? "Actualizando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
}
