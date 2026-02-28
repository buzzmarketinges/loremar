"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DishSearch from "../DishSearch";
import ImageUploader from "../../components/ImageUploader";

type BlockType = "HEADER" | "PARAGRAPH" | "DISH";

interface Block {
    id: string; // solo para keys de React
    type: BlockType;
    content: any;
}

const ALLERGENS = [
    "Gluten", "Crustáceos", "Huevos", "Pescado", "Frutos secos",
    "Soja", "Lácteos", "Apio", "Mostaza", "Sésamo", "Sulfitos", "Moluscos"
];

const CATEGORIES = [
    "Tapas", "Carnes", "Pescados", "Mariscos", "Postres"
];

export default function NewMenuPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [menuType, setMenuType] = useState<"MENU" | "CARTA" | "VINO">("MENU");
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [slug, setSlug] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [order, setOrder] = useState("0");
    const [mainImage, setMainImage] = useState("");
    const [saving, setSaving] = useState(false);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[^a-z0-z0-9\s-]/g, "") // remove special chars
            .trim()
            .replace(/\s+/g, "-") // spaces to hyphens
            .replace(/-+/g, "-"); // double hyphens to single
    };

    const addBlock = (type: BlockType) => {
        let defaultContent = {};
        if (type === "HEADER") defaultContent = { text: "", size: "L" };
        if (type === "PARAGRAPH") defaultContent = { text: "" };
        if (type === "DISH") defaultContent = { name: "", description: "", price: "", allergens: [], category: "Tapas", imageUrl: "" };

        setBlocks([...blocks, { id: crypto.randomUUID(), type, content: defaultContent }]);
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const updateBlockContent = (id: string, newContent: any) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b));
    };

    const toggleAllergen = (blockId: string, allergen: string) => {
        setBlocks(blocks.map(b => {
            if (b.id !== blockId) return b;
            const allergens = b.content.allergens as string[];
            const newAllergens = allergens.includes(allergen)
                ? allergens.filter(a => a !== allergen)
                : [...allergens, allergen];
            return { ...b, content: { ...b.content, allergens: newAllergens } };
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return alert("El nombre es obligatorio");

        setSaving(true);
        try {
            const res = await fetch("/api/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    type: menuType,
                    price,
                    blocks,
                    slug: slug || undefined,
                    seoTitle: seoTitle || undefined,
                    seoDescription: seoDescription || undefined,
                    order,
                    mainImage
                }),
            });

            if (res.ok) {
                router.push("/admin/menus");
                router.refresh();
            } else {
                const errData = await res.json();
                alert(`Error al guardar el menú: ${errData.details || errData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fade-in" style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "5rem" }}>
            <h1 style={{ marginBottom: "2rem" }}>Crear Nuevo Menú</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ padding: "1.5rem", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                        <div>
                            <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Nombre del Menú / Carta</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => {
                                    const val = e.target.value;
                                    setName(val);
                                    setSlug(generateSlug(val));
                                    if (!seoTitle) setSeoTitle(`${val} | Restaurante LOREMAR`);
                                }}
                                placeholder="Ej: Menú Fin de Semana"
                                style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                required
                            />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {menuType === "MENU" ? (
                                <div>
                                    <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Precio</label>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        placeholder="Ej: 14,50€"
                                        style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                    />
                                </div>
                            ) : <div></div>}
                            <div>
                                <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Orden</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={e => setOrder(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        <div>
                            <label style={{ display: "block", color: "var(--gold)", marginBottom: "0.5rem" }}>Tipo</label>
                            <select
                                value={menuType}
                                onChange={e => setMenuType(e.target.value as "MENU" | "CARTA" | "VINO")}
                                style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                            >
                                <option value="MENU">Menú (precio conjunto al final)</option>
                                <option value="CARTA">Carta (precios individuales con categorías)</option>
                                <option value="VINO">Vinos (lista de bodega)</option>
                            </select>
                        </div>
                        <div style={{ alignSelf: "end" }}>
                            <ImageUploader
                                label="Imagen Principal del Menú"
                                currentImageUrl={mainImage}
                                onUploadSuccess={setMainImage}
                                placeholder="Esta imagen se verá de fondo en la web."
                                linkedName={name}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "0.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <h4 style={{ color: "var(--gold)", marginBottom: "1rem" }}>SEO y Ajustes de URL</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                            <div>
                                <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Slug de la URL (amigable)</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "#aaa", fontSize: "0.9rem" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Título SEO</label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={e => setSeoTitle(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "#aaa", fontSize: "0.9rem" }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Meta Descripción SEO</label>
                            <textarea
                                value={seoDescription}
                                onChange={e => setSeoDescription(e.target.value)}
                                style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "#aaa", fontSize: "0.9rem", minHeight: "60px" }}
                            />
                        </div>
                    </div>
                </div>

                <h3 style={{ color: "var(--gold)", marginBottom: "1rem" }}>Constructor de Bloques</h3>

                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                    <button type="button" onClick={() => addBlock("HEADER")} className="add-btn">+ Encabezado</button>
                    <button type="button" onClick={() => addBlock("PARAGRAPH")} className="add-btn">+ Párrafo</button>
                    <button type="button" onClick={() => addBlock("DISH")} className="add-btn">+ Plato</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
                    {blocks.length === 0 && <p style={{ color: "#888", textAlign: "center", padding: "2rem", border: "1px dashed var(--border)", borderRadius: "8px" }}>Sin bloques. Añade uno para empezar.</p>}

                    {blocks.map((block, index) => (
                        <div key={block.id} style={{ padding: "1.5rem", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", position: "relative" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                <span style={{ color: "var(--gold)", fontWeight: "bold" }}>
                                    {index + 1}. {block.type === "HEADER" ? "Encabezado" : block.type === "PARAGRAPH" ? "Párrafo" : `Plato [${block.content.category || "Otros"}]`}
                                </span>
                                <button type="button" onClick={() => removeBlock(block.id)} style={{ color: "#ff4444", background: "none", border: "none", cursor: "pointer" }}>Eliminar</button>
                            </div>

                            {block.type === "HEADER" && (
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <select
                                        value={block.content.size}
                                        onChange={e => updateBlockContent(block.id, { size: e.target.value })}
                                        style={{ padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                    >
                                        <option value="L">Talla L</option>
                                        <option value="XL">Talla XL</option>
                                        <option value="XXL">Talla XXL</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={block.content.text}
                                        onChange={e => updateBlockContent(block.id, { text: e.target.value })}
                                        placeholder="Texto del encabezado..."
                                        style={{ flex: 1, padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "var(--font-serif)" }}
                                    />
                                </div>
                            )}

                            {block.type === "PARAGRAPH" && (
                                <textarea
                                    value={block.content.text}
                                    onChange={e => updateBlockContent(block.id, { text: e.target.value })}
                                    placeholder="Escribe el párrafo aquí..."
                                    style={{ width: "100%", padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", minHeight: "80px", fontFamily: "var(--font-sans)" }}
                                />
                            )}

                            {block.type === "DISH" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <DishSearch onSelect={(dish) => {
                                        updateBlockContent(block.id, {
                                            name: dish.name,
                                            description: dish.description || "",
                                            price: dish.price || "",
                                            allergens: JSON.parse(dish.allergens || "[]"),
                                            imageUrl: dish.imageUrl || ""
                                        });
                                    }} />

                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <input
                                            type="text"
                                            value={block.content.name}
                                            onChange={e => updateBlockContent(block.id, { name: e.target.value })}
                                            placeholder="Nombre del plato..."
                                            style={{ flex: 2, padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", fontWeight: "bold" }}
                                        />
                                        <input
                                            type="text"
                                            value={block.content.price}
                                            onChange={e => updateBlockContent(block.id, { price: e.target.value })}
                                            placeholder="Precio (ej. 15.50)"
                                            style={{ flex: 1, padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                        />
                                        {(menuType === "CARTA" || menuType === "VINO") && (
                                            <select
                                                value={block.content.category || "Tapas"}
                                                onChange={e => updateBlockContent(block.id, { category: e.target.value })}
                                                style={{ flex: 1, padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <textarea
                                            value={block.content.description}
                                            onChange={e => updateBlockContent(block.id, { description: e.target.value })}
                                            placeholder="Descripción del plato..."
                                            style={{ flex: 2, padding: "0.8rem", borderRadius: "4px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", minHeight: "60px" }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <ImageUploader
                                                label="Imagen del Plato"
                                                currentImageUrl={block.content.imageUrl}
                                                onUploadSuccess={(url) => updateBlockContent(block.id, { imageUrl: url })}
                                                linkedName={block.content.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", color: "var(--copper)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Alérgenos:</label>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                            {ALLERGENS.map(allergen => (
                                                <label key={allergen} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", padding: "0.3rem 0.6rem", borderRadius: "4px", cursor: "pointer" }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={block.content.allergens?.includes(allergen) || false}
                                                        onChange={() => toggleAllergen(block.id, allergen)}
                                                    />
                                                    {allergen}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        width: "100%", padding: "1rem", backgroundColor: "var(--gold)", color: "#000",
                        border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "1.1rem",
                        cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1
                    }}
                >
                    {saving ? "Guardando..." : "Guardar Menú"}
                </button>
            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
        .add-btn {
          flex: 1; padding: 0.8rem; background-color: transparent; color: var(--gold); border: 1px dashed var(--gold);
          border-radius: 4px; cursor: pointer; transition: all 0.2s; font-weight: 500;
        }
        .add-btn:hover {
          background-color: rgba(212, 175, 55, 0.1); border-style: solid;
        }
      `}} />
        </div>
    );
}
