import prisma from "@/lib/prisma";
import Link from "next/link";
import OrderInput from "./OrderInput";

export default async function MenusPage({
    searchParams
}: {
    searchParams: Promise<{ type?: string }>
}) {
    const { type } = await searchParams;

    const where = type ? { type: type } : {};

    const menus = await prisma.menu.findMany({
        where,
        orderBy: [
            { order: "asc" },
            { createdAt: "desc" }
        ],
    });

    const title = type === "VINO" ? "Gestión de Vinos" : "Gestión de Menús y Cartas";

    return (
        <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>{title}</h1>
                <Link href="/admin/menus/new" style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "var(--gold)",
                    color: "#000",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    transition: "background 0.2s"
                }}>
                    + Crear {type === "VINO" ? "Carta de Vinos" : "Menú / Carta"}
                </Link>
            </div>

            {menus.length === 0 ? (
                <p style={{ color: "#888" }}>No hay elementos registrados{type ? ` de tipo ${type}` : ""}.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border)", color: "var(--gold)" }}>
                            <th style={{ padding: "1rem", width: "100px" }}>Orden</th>
                            <th style={{ padding: "1rem" }}>Nombre</th>
                            <th style={{ padding: "1rem" }}>Tipo</th>
                            <th style={{ padding: "1rem" }}>Fecha de Creación</th>
                            <th style={{ padding: "1rem", textAlign: "right" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                <td style={{ padding: "1rem" }}>
                                    <OrderInput menuId={menu.id} initialOrder={menu.order || 0} />
                                </td>
                                <td style={{ padding: "1rem", fontWeight: "500" }}>{menu.name}</td>
                                <td style={{ padding: "1rem", fontSize: "0.8rem", color: "#888" }}>
                                    <span style={{ border: "1px solid #444", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                                        {menu.type}
                                    </span>
                                </td>
                                <td style={{ padding: "1rem", color: "#666" }}>{new Date(menu.createdAt).toLocaleDateString("es-ES")}</td>
                                <td style={{ padding: "1rem", textAlign: "right" }}>
                                    <Link href={`/admin/menus/${menu.id}`} style={{ color: "var(--gold)", textDecoration: "underline", fontWeight: "bold" }}>
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
