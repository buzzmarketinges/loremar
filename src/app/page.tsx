export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronDown, MapPin, Phone, Instagram, Facebook, Clock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import GalleryItem from "@/components/GalleryItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurante Loremar | Marisquería y Arroces en Sabadell",
  description: "Te traemos el mejor marisco fresco directo de la lonja. Descubre los mejores arroces y tapas de Sabadell",
  alternates: {
    canonical: "https://restaurantloremar.com",
  },
};

export default async function Home() {
  const menus = await prisma.menu.findMany({
    where: {
      type: "MENU",
      NOT: {
        OR: [
          { name: { contains: "Vino" } },
          { name: { contains: "Vinos" } }
        ]
      }
    },
    orderBy: { order: "asc" },
  });

  const favoriteImages = await prisma.image.findMany({
    where: { isFavorite: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>

      <Navbar />

      {/* Hero Section Impactante */}
      <section style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden"
        }}>
          <img
            src="/uploads/restaurante-loremar-sabadell.webp"
            alt="Hero Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.9) contrast(1.1)",
              opacity: 0.8
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))"
          }} />
        </div>

        <div className="fade-in" style={{ maxWidth: "900px", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          <h1 style={{
            color: "var(--gold)",
            letterSpacing: "6px",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            display: "block",
            marginBottom: "1.5rem",
            fontWeight: "normal"
          }}>
            Marisquería y Arrocería en el centro de Sabadell
          </h1>
          <h2 style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            color: "#fff",
            lineHeight: "1.1",
            marginBottom: "2rem",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            fontFamily: "var(--font-serif)",
            fontWeight: "normal"
          }}>
            Del mar al <br /> <span style={{ color: "var(--gold)", whiteSpace: "nowrap" }}>corazón de Sabadell</span>
          </h2>
          <p style={{
            fontSize: "1.2rem",
            color: "#ccc",
            maxWidth: "700px",
            margin: "0 auto 3rem auto",
            lineHeight: "1.7",
            fontFamily: "var(--font-sans)",
            fontWeight: "300"
          }}>
            En Loremar, el respeto al producto es nuestra identidad. <br />
            Traemos el mejor marisco fresco directo de la lonja a nuestra cocina para ofrecerte el mejor producto.
          </p>
          <div className="hero-actions" style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <a href="#cartas" style={{
              border: "1px solid #fff",
              color: "#fff",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              fontWeight: "500",
              letterSpacing: "1px",
              textDecoration: "none"
            }} className="secondary-btn">VER MENÚ</a>
            <a href="https://reservas.restaurantloremar.com/" target="_blank" style={{
              backgroundColor: "var(--gold)",
              color: "#000",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              fontWeight: "bold",
              letterSpacing: "1px",
              textDecoration: "none"
            }} className="primary-btn">RESERVAR AHORA</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "30px", animation: "bounce 2s infinite" }}>
          <ChevronDown color="var(--gold)" size={32} opacity={0.6} />
        </div>
      </section>

      {/* Sección de Cartas Dinámicas */}
      <section id="cartas" style={{ padding: "8rem 5%", backgroundColor: "rgba(255,255,255,0.02)" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span style={{ color: "var(--gold)", letterSpacing: "4px", fontSize: "0.8rem", textTransform: "uppercase" }}>Marisco Fresco Sabadell</span>
          <h2 style={{ fontSize: "3.5rem", marginTop: "1rem" }}>La propuesta gastronómica de Loremar</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            <button className="pill-btn active" style={{
              backgroundColor: "rgba(212,175,55,0.15)",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              padding: "0.6rem 2rem",
              borderRadius: "50px",
              fontSize: "0.9rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}>Nuestros Menús</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          {menus.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", gridColumn: "1/-1" }}>La carta se está actualizando. Vuelve pronto.</p>
          ) : (
            menus.map((menu: any, index: number) => (
              <Link key={menu.id} href={`/${menu.slug || menu.id}`} className="menu-card" style={{
                height: "450px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2.5rem",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "var(--surface)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundImage: menu.mainImage ? `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,1) 60%), url('${menu.mainImage}')` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
                <div style={{
                  position: "absolute",
                  top: "2.5rem",
                  right: "2.5rem",
                  color: "rgba(212,175,55,0.1)",
                  fontSize: "5rem",
                  fontWeight: "bold",
                  fontFamily: "var(--font-serif)"
                }}>
                  0{index + 1}
                </div>
                <h3 style={{ fontSize: "2.5rem", color: "#fff", marginBottom: "0.5rem", textShadow: "0 2px 15px rgba(0,0,0,0.8)" }}>{menu.name}</h3>
                <div style={{
                  marginTop: "1.5rem",
                  display: "inline-block",
                  color: "var(--gold)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  letterSpacing: "1px"
                }}>
                  VER MENÚ →
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Sección Experiencia / About (Convertida en Banner) */}
      <section id="experiencia" style={{
        padding: "10rem 5%",
        position: "relative",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden"
      }}>
        {/* Background Layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden"
        }}>
          <img
            src="/uploads/restaurante-sabadell.webp"
            alt="Experience Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(3px) brightness(0.6)",
              transform: "scale(1.05)"
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))"
          }} />
        </div>

        {/* Content Layer */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", width: "100%" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#fff",
            marginBottom: "2rem",
            fontFamily: "var(--font-serif)",
            whiteSpace: "nowrap"
          }}>
            Maestría, Lonja y Tradición
          </h2>
          <div style={{ height: "3px", width: "80px", backgroundColor: "var(--gold)", margin: "0 auto 2.5rem auto" }} />
          <p style={{ fontSize: "1.2rem", color: "#eee", lineHeight: "1.8", marginBottom: "2rem", fontWeight: "300" }}>
            En Loremar, entendemos que el respeto al producto es el principio de todo. Situados en el centro de Sabadell, somos su marisquería de referencia, donde la frescura llega directamente de la lonja a su mesa sin intermediarios.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#eee", lineHeight: "1.8", fontWeight: "300" }}>
            Nuestro equipo domina el arte de tratar el marisco y los arroces con precisión técnica, combinando la autenticidad de los sabores tradicionales con la elegancia de la alta cocina. Una experiencia gastronómica donde cada detalle refleja nuestra pasión por el mar y un trato cercano que nos define.
          </p>
        </div>
      </section>

      {/* Nueva Sección: Imágenes de nuestros platos */}
      {favoriteImages.length > 0 && (
        <section id="galeria" style={{ padding: "10rem 5%", backgroundColor: "var(--background)" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span style={{ color: "var(--gold)", letterSpacing: "4px", fontSize: "0.8rem", textTransform: "uppercase" }}>Calidad de Primera</span>
            <h2 style={{ fontSize: "3.5rem", marginTop: "1rem" }}>Imágenes de nuestros platos</h2>
            <div style={{ height: "3px", width: "100px", backgroundColor: "var(--gold)", margin: "1.5rem auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>
            {favoriteImages.map((img: any) => (
              <GalleryItem key={img.id} img={img} />
            ))}
          </div>
        </section>
      )}

      {/* Footer / Contacto */}
      <footer id="ubicacion" style={{ padding: "8rem 5% 4rem 5%", backgroundColor: "#000", borderTop: "1px solid #111" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "4rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Loremar</h3>
            <p style={{ color: "#777", lineHeight: "1.7", marginBottom: "2rem" }}>
              Su marisquería y arrocería de confianza en el corazón de Sabadell. Marisco fresco directo de lonja y un servicio profesional que marca la diferencia.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.instagram.com/restaurantloremar/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", transition: "opacity 0.3s" }} className="hover-opacity">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/RestaurantLoremar/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", transition: "opacity 0.3s" }} className="hover-opacity">
                <Facebook />
              </a>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: "1.5rem", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px" }}>Horarios</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "#777", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Lunes</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Martes</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Miércoles</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Jueves</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Viernes</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Sábado</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Domingo</span> <span>13:00 - 16:00 | Cena Cerrado</span></div>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: "1.5rem", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px" }}>Contacto</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#777", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}><MapPin size={18} color="var(--gold)" /> <a href="https://goo.gl/maps/carrer-lluis-carreras-13-sabadell" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Carrer de Lluís Carreras, 13, 17, 08208 Sabadell</a></div>
              <div style={{ display: "flex", gap: "1rem" }}><Phone size={18} color="var(--gold)" /> <a href="tel:937179146" style={{ color: "inherit", textDecoration: "none" }}>937 17 91 46</a></div>
              <div style={{ display: "flex", gap: "1rem" }}><Globe size={18} color="var(--gold)" /> <a href="https://restaurantloremar.com" style={{ color: "inherit", textDecoration: "none" }}>restaurantloremar.com</a></div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "8rem", textAlign: "center", borderTop: "1px solid #111", paddingTop: "2rem", color: "#777", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>© 2026 Restaurante Loremar. Tradición y Excelencia.</div>
          <div style={{ fontSize: "0.75rem" }}>
            Web desarrollada por la <a href="https://buzzmarketing.es" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>agencia de marketing de Sabadell BuzzMarketing</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
        .fade-in { animation: fadeIn 1.5s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 900px) {
          #experiencia {
            padding: 5rem 5% !important;
            min-height: 400px !important;
          }
          #experiencia h2 {
            font-size: 1.5rem !important;
            white-space: normal !important;
          }
          .hero-actions {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1rem !important;
          }
          .hero-actions a {
            width: 100% !important;
            max-width: 300px !important;
          }
          h1 {
            font-size: 3rem !important;
          }
          h2 {
            font-size: 2.2rem !important;
          }
          header h2, #cartas h2, #galeria h2 {
            font-size: 2.5rem !important;
          }
          footer > div {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 3rem !important;
          }
          footer div div {
            justify-content: center !important;
          }
        }

        .menu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .gallery-item:hover {
          transform: scale(1.02);
          border-color: var(--gold) !important;
          z-index: 10;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
