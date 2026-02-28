export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";

export default async function DashboardPage() {
    const menusCount = await prisma.menu.count();
    const imagesCount = await prisma.image.count();

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: "2rem" }}>Panel de Control</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                <div style={{
                    padding: "2rem",
                    backgroundColor: "var(--surface)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}>
                    <h3 style={{ color: "var(--foreground)", marginBottom: "0.5rem" }}>Menús Guardados</h3>
                    <p style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: "bold" }}>{menusCount}</p>
                </div>

                <div style={{
                    padding: "2rem",
                    backgroundColor: "var(--surface)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}>
                    <h3 style={{ color: "var(--foreground)", marginBottom: "0.5rem" }}>Imágenes Vinculadas</h3>
                    <p style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: "bold" }}>{imagesCount}</p>
                </div>
            </div>
        </div>
    );
}
