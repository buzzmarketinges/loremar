"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
            <div style={{ width: "100%", maxWidth: "400px", padding: "2rem", border: "1px solid var(--border)", borderRadius: "8px", backgroundColor: "var(--surface)" }} className="fade-in">
                <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Admin Login</h1>

                {error && (
                    <div style={{ color: "#ff4444", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gold)" }}>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: "100%", padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border)",
                                backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)"
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gold)" }}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%", padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border)",
                                backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)"
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            marginTop: "1rem", padding: "1rem", backgroundColor: "var(--gold)", color: "#000",
                            border: "none", borderRadius: "4px", fontWeight: "600", fontSize: "1rem", transition: "background-color 0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--gold-hover)"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--gold)"}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
