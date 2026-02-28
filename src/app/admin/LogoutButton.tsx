"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem",
                color: "#ff4444",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s"
            }}
            className="admin-logout-btn"
        >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
            <style dangerouslySetInnerHTML={{
                __html: `
        .admin-logout-btn:hover {
          color: #ff6666 !important;
        }
      `}} />
        </button>
    );
}
