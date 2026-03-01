import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {children}
            </div>
        );
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--background)" }}>
            {/* Sidebar Navigation */}
            <aside style={{
                width: "250px",
                borderRight: "1px solid var(--border)",
                padding: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                backgroundColor: "var(--surface)"
            }}>
                <div>
                    <h2 style={{ color: "var(--gold)", marginBottom: "0.5rem" }}>Loremar</h2>
                    <p style={{ fontSize: "0.8rem", color: "#888", fontFamily: "var(--font-sans)" }}>Admin Back-Office</p>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                    <Link href="/admin/dashboard" style={{ padding: "0.8rem", borderRadius: "4px", transition: "background 0.2s" }} className="admin-nav-link">
                        Dashboard
                    </Link>
                    <Link href="/admin/menus" style={{ padding: "0.8rem", borderRadius: "4px", transition: "background 0.2s" }} className="admin-nav-link">
                        Gestión de Menús
                    </Link>
                    <Link href="/admin/dishes" style={{ padding: "0.8rem", borderRadius: "4px", transition: "background 0.2s" }} className="admin-nav-link">
                        Gestión de Platos
                    </Link>
                    <Link href="/admin/menus?type=VINO" style={{ padding: "0.8rem", borderRadius: "4px", transition: "background 0.2s" }} className="admin-nav-link">
                        Carta de Vinos
                    </Link>
                    <Link href="/admin/images" style={{ padding: "0.8rem", borderRadius: "4px", transition: "background 0.2s" }} className="admin-nav-link">
                        Gestión de Imágenes
                    </Link>
                </nav>

                <LogoutButton />
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
                {children}
            </main>

            {/* Embedded styles for nav hover effects */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .admin-nav-link:hover {
          background-color: rgba(212, 175, 55, 0.1);
          color: var(--gold);
        }
      `}} />
        </div>
    );
}
