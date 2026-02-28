"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    centerContent?: React.ReactNode;
}

export default function Navbar({ centerContent }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 5%",
            zIndex: 1000,
            backgroundColor: scrolled || isOpen ? "rgba(10, 10, 10, 0.98)" : "rgba(10, 10, 10, 0.5)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
            transition: "all 0.3s ease"
        }}>
            {/* Left: Logo */}
            <Link href="/" onClick={closeMenu} style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                fontFamily: "var(--font-serif)",
                color: "var(--gold)",
                letterSpacing: "3px",
                textDecoration: "none",
                zIndex: 1001
            }}>
                LOREMAR
            </Link>

            {/* Center: Optional Title (e.g. for Menu Pages) */}
            {centerContent && (
                <div className="nav-center-content" style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    width: "auto",
                    zIndex: 1001
                }}>
                    {centerContent}
                </div>
            )}

            {/* Right: Desktop Links */}
            <div className="nav-links-desktop" style={{ display: "flex", gap: "2rem", alignItems: "center", zIndex: 1001 }}>
                {!centerContent && (
                    <>
                        <a href="/#experiencia" className="nav-link">Experiencia</a>
                        <a href="/#cartas" className="nav-link">Cartas</a>
                        <a href="/#galeria" className="nav-link">Galería</a>
                        <a href="/#ubicacion" className="nav-link">Contacto</a>
                    </>
                )}
                {centerContent && (
                    <Link href="/#cartas" className="nav-link">Nuestros Menús</Link>
                )}
                <a
                    href="https://reservas.restaurantloremar.com/"
                    target="_blank"
                    style={{
                        backgroundColor: "var(--gold)",
                        color: "#000",
                        padding: "0.6rem 1.2rem",
                        borderRadius: "2px",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                        textDecoration: "none",
                        boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)"
                    }}
                >
                    RESERVAR
                </a>
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={toggleMenu}
                style={{
                    display: "none",
                    background: "none",
                    border: "none",
                    color: "var(--gold)",
                    cursor: "pointer",
                    zIndex: 1001,
                    padding: "10px"
                }}
                className="mobile-toggle"
            >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

            {/* Mobile Overlay Menu */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(10, 10, 10, 0.98)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2.5rem",
                transition: "opacity 0.3s ease, visibility 0.3s",
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? "visible" : "hidden",
                zIndex: 1000
            }}>
                <Link href="/" onClick={closeMenu} className="nav-link-mobile">Inicio</Link>
                <a href="/#experiencia" onClick={closeMenu} className="nav-link-mobile">Experiencia</a>
                <a href="/#cartas" onClick={closeMenu} className="nav-link-mobile">Nuestras Cartas</a>
                <a href="/#galeria" onClick={closeMenu} className="nav-link-mobile">Galería</a>
                <a href="/#ubicacion" onClick={closeMenu} className="nav-link-mobile">Localización</a>
                <a
                    href="https://reservas.restaurantloremar.com/"
                    target="_blank"
                    onClick={closeMenu}
                    style={{
                        backgroundColor: "var(--gold)",
                        color: "#000",
                        padding: "1rem 2.5rem",
                        borderRadius: "2px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        letterSpacing: "2px",
                        textDecoration: "none",
                        marginTop: "1rem"
                    }}
                >
                    RESERVAR MESA
                </a>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .nav-link {
                    color: #fff;
                    opacity: 0.8;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    font-size: 0.75rem;
                    letter-spacing: 2px;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                .nav-link:hover {
                    opacity: 1;
                    color: var(--gold);
                }
                .nav-link-mobile {
                    color: #fff;
                    font-size: 1.5rem;
                    font-family: var(--font-serif);
                    text-decoration: none;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    transition: color 0.3s;
                }
                .nav-link-mobile:hover {
                    color: var(--gold);
                }
                @media (max-width: 1024px) {
                    .nav-links-desktop {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                    .nav-center-content {
                        display: none !important;
                    }
                }
            `}} />
        </nav>
    );
}
