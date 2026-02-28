import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DishesPage() {
    const dishes = await prisma.dish.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>Gestión de Platos</h1>
                <Link href="/admin/dishes/new" style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "var(--gold)",
                    color: "#000",
                    borderRadius: "4px",
                    fontWeight: "bold",
                }}>
                    + Nuevo Plato
                </Link>
            </div>

            {dishes.length === 0 ? (
                <p style={{ color: "#888" }}>No hay platos creados todavía.</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {dishes.map((dish) => (
                        <div key={dish.id} style={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            {dish.imageUrl && (
                                <img src={dish.imageUrl} alt={dish.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                            )}
                            <div style={{ padding: "1.2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                                    <h3 style={{ margin: 0, color: "var(--gold)" }}>{dish.name}</h3>
                                    <span style={{ fontWeight: "bold", color: "#fff" }}>{dish.price}</span>
                                </div>
                                <p style={{ fontSize: "0.85rem", color: "#aaa", margin: "0 0 1rem 0", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {dish.description}
                                </p>
                                <Link href={`/admin/dishes/${dish.id}`} style={{
                                    display: "block",
                                    textAlign: "center",
                                    padding: "0.5rem",
                                    border: "1px solid var(--gold)",
                                    color: "var(--gold)",
                                    borderRadius: "4px",
                                    fontSize: "0.9rem"
                                }}>
                                    Editar Plato
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
