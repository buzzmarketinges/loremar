"use client";

import { useEffect, useState } from "react";

type ConsentValue = "all" | "necessary" | null;

export const COOKIE_CONSENT_KEY = "loremar_cookie_consent";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!saved) setVisible(true);
    }, []);

    function accept() {
        localStorage.setItem(COOKIE_CONSENT_KEY, "all");
        setVisible(false);
        window.dispatchEvent(new Event("cookie_consent_updated"));
    }

    function reject() {
        localStorage.setItem(COOKIE_CONSENT_KEY, "necessary");
        setVisible(false);
        window.dispatchEvent(new Event("cookie_consent_updated"));
    }

    if (!visible) return null;

    return (
        <>
            {/* Backdrop blur sutil */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: 999,
                pointerEvents: "none",
            }} />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Aviso de cookies"
                style={{
                    position: "fixed",
                    bottom: "1.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    width: "min(760px, calc(100vw - 2rem))",
                    backgroundColor: "#0a0a0a",
                    border: "1px solid rgba(212,175,55,0.25)",
                    borderRadius: "6px",
                    padding: "1.8rem 2rem",
                    display: "flex",
                    gap: "2rem",
                    alignItems: "center",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.05)",
                }}
                className="cookie-banner"
            >
                {/* Icono decorativo */}
                <div style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontSize: "1.1rem",
                }}>
                    🍪
                </div>

                {/* Texto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                        margin: "0 0 0.4rem 0",
                        fontSize: "0.9rem",
                        color: "#ddd",
                        fontWeight: 500,
                        lineHeight: 1.4,
                    }}>
                        Usamos cookies para mejorar tu experiencia y analizar el tráfico.
                    </p>
                    <p style={{
                        margin: 0,
                        fontSize: "0.78rem",
                        color: "#666",
                        lineHeight: 1.5,
                    }}>
                        <a
                            href="/politica-de-cookies"
                            style={{ color: "rgba(212,175,55,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(212,175,55,0.2)" }}
                        >
                            Más información
                        </a>
                    </p>
                </div>

                {/* Botones */}
                <div style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexShrink: 0,
                    alignItems: "center",
                }}
                    className="cookie-btns"
                >
                    <button
                        onClick={reject}
                        style={{
                            padding: "0.55rem 1.2rem",
                            fontSize: "0.78rem",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#888",
                            borderRadius: "3px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                        }}
                        className="cookie-btn-reject"
                    >
                        Solo necesarias
                    </button>
                    <button
                        onClick={accept}
                        style={{
                            padding: "0.55rem 1.4rem",
                            fontSize: "0.78rem",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            background: "var(--gold)",
                            border: "1px solid var(--gold)",
                            color: "#000",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                        }}
                        className="cookie-btn-accept"
                    >
                        Aceptar todo
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .cookie-btn-reject:hover {
                    border-color: rgba(255,255,255,0.3) !important;
                    color: #bbb !important;
                }
                .cookie-btn-accept:hover {
                    opacity: 0.85;
                }
                @media (max-width: 600px) {
                    .cookie-banner {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1.2rem !important;
                        padding: 1.4rem 1.4rem !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        transform: none !important;
                        width: 100% !important;
                        border-radius: 0 !important;
                        border-left: none !important;
                        border-right: none !important;
                        border-bottom: none !important;
                    }
                    .cookie-btns {
                        width: 100% !important;
                    }
                    .cookie-btns button {
                        flex: 1 !important;
                        text-align: center !important;
                    }
                }
            `}} />
        </>
    );
}
