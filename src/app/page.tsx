export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, Phone, Instagram, Facebook, Clock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import GalleryItem from "@/components/GalleryItem";
import MenuTabs from "@/components/MenuTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurante Loremar | Arrocería y Cocina de Mercado en Sabadell",
  description: "Especialistas en arroces, tapas y cocina de mercado en Sabadell. Descubre nuestra propuesta gastronómica mediterránea.",
  alternates: {
    canonical: "https://restaurantloremar.com",
  },
};

export default async function Home() {
  const menus = await prisma.menu.findMany({
    orderBy: { order: "asc" },
  });

  const allImages = await prisma.image.findMany({
    where: {
      linkedDishName: { not: null }
    },
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
          <Image
            src="/assets/restaurante-loremar-sabadell.webp"
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            style={{
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
          <h1 className="hero-subtitle" style={{
            color: "var(--gold)",
            letterSpacing: "6px",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            display: "block",
            marginBottom: "1.5rem",
            fontWeight: "normal"
          }}>
            Arrocería y Cocina de Mercado en el centro de Sabadell
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
            Arroces y tapas en el <br /> <span style={{ color: "var(--gold)", whiteSpace: "nowrap" }}>corazón de Sabadell</span>
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
            Seleccionamos los mejores productos de mercado y proximidad para ofrecerte una experiencia gastronómica única e inolvidable.
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
          <span style={{ color: "var(--gold)", letterSpacing: "4px", fontSize: "0.8rem", textTransform: "uppercase" }}>Arrocería y Tapas Sabadell</span>
          <h2 style={{ fontSize: "3.5rem", marginTop: "1rem" }}>La propuesta gastronómica de Loremar</h2>

          <MenuTabs menus={menus} />
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
          <Image
            src="/assets/restaurante-sabadell.webp"
            alt="Experience Background"
            fill
            sizes="100vw"
            style={{
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
            Arroces, Mercado y Tradición
          </h2>
          <div style={{ height: "3px", width: "80px", backgroundColor: "var(--gold)", margin: "0 auto 2.5rem auto" }} />
          <p style={{ fontSize: "1.2rem", color: "#eee", lineHeight: "1.8", marginBottom: "2rem", fontWeight: "300" }}>
            En Loremar, entendemos que el respeto al producto es el principio de todo. Situados en el centro de Sabadell, somos su arrocería de referencia, donde la calidad del producto de mercado llega directamente a su mesa.
          </p>
          <p style={{ fontSize: "1.2rem", color: "#eee", lineHeight: "1.8", fontWeight: "300" }}>
            Nuestro equipo domina el arte de tratar los arroces y las tapas con precisión técnica, combinando la autenticidad de los sabores tradicionales con la elegancia de la alta cocina. Una experiencia gastronómica donde cada detalle refleja nuestra pasión por la cocina y un trato cercano que nos define.
          </p>
        </div>
      </section>

      {/* Sección: Imágenes de nuestros platos (Galería completa) */}
      {allImages.length > 0 && (
        <section id="galeria" style={{ padding: "10rem 5%", backgroundColor: "var(--background)", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span style={{ color: "var(--gold)", letterSpacing: "4px", fontSize: "0.8rem", textTransform: "uppercase" }}>Nuestra Cocina</span>
            <h2 style={{ fontSize: "3.5rem", marginTop: "1rem" }}>Imágenes de nuestros platos</h2>
            <div style={{ height: "3px", width: "100px", backgroundColor: "var(--gold)", margin: "1.5rem auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1600px",
            margin: "0 auto"
          }}>
            {allImages.map((img: any) => (
              <div key={img.id} className="gallery-item-wrapper" style={{
                position: "relative",
                height: "400px",
                overflow: "hidden",
                borderRadius: "4px",
                cursor: "pointer",
                border: "1px solid rgba(212, 175, 55, 0.1)"
              }}>
                <Image
                  src={img.url}
                  alt={img.linkedDishName || "Plato Loremar"}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
                  className="gallery-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2rem",
                  transition: "opacity 0.4s ease"
                }} className="gallery-overlay">
                  {img.linkedDishName && (
                    <h3 style={{
                      color: "#fff",
                      fontSize: "1.4rem",
                      fontFamily: "var(--font-serif)",
                      margin: 0,
                      fontWeight: "normal",
                      transform: "translateY(10px)",
                      transition: "transform 0.4s ease"
                    }} className="gallery-dish-name">
                      {img.linkedDishName}
                    </h3>
                  )}
                  <div style={{
                    height: "2px",
                    width: "40px",
                    backgroundColor: "var(--gold)",
                    marginTop: "0.8rem",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease"
                  }} className="gallery-dish-line" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer / Contacto */}
      <footer id="ubicacion" style={{ padding: "8rem 5% 4rem 5%", backgroundColor: "#000", borderTop: "1px solid #111" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div>
            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Loremar</h3>
            <div style={{ marginBottom: "2rem", width: "100%", overflow: "hidden", borderRadius: "8px" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5971.260476242124!2d2.098485276446369!3d41.55560268554355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a494e392657f11%3A0x46566c8232a1e612!2sLoremar!5e0!3m2!1ses!2ses!4v1772410059998!5m2!1ses!2ses" width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.instagram.com/restaurantloremar/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", transition: "opacity 0.3s" }} className="hover-opacity" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/RestaurantLoremar/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", transition: "opacity 0.3s" }} className="hover-opacity" aria-label="Facebook">
                <Facebook />
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "1.5rem", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px" }}>Contacto</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#777", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}><MapPin size={18} color="var(--gold)" /> <a href="https://goo.gl/maps/carrer-lluis-carreras-13-sabadell" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Carrer de Lluís Carreras, 13, 17, 08208 Sabadell</a></div>
                <div style={{ display: "flex", gap: "1rem" }}><Phone size={18} color="var(--gold)" /> <a href="tel:937179146" style={{ color: "inherit", textDecoration: "none" }}>937 17 91 46</a></div>
                <div style={{ display: "flex", gap: "1rem" }}><Globe size={18} color="var(--gold)" /> <a href="https://restaurantloremar.com" style={{ color: "inherit", textDecoration: "none" }}>restaurantloremar.com</a></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "1.5rem", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px" }}>Horarios</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "#777", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>De lunes a sábado</span> <span>13:00 - 16:00 | 20:00 - 00:00</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Domingo</span> <span>13:00 - 16:00 | Cena Cerrado</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright" style={{ marginTop: "8rem", textAlign: "center", borderTop: "1px solid #111", paddingTop: "2rem", color: "#777", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          .hero-subtitle {
            font-size: 0.75rem !important;
            letter-spacing: 3px !important;
            line-height: 1.5;
            padding: 0 10px;
          }
          h2 {
            font-size: 2.2rem !important;
          }
          header h2, #cartas h2, #galeria h2 {
            font-size: 2.5rem !important;
          }
          footer[id="ubicacion"] {
            padding: 4rem 5% 2rem 5% !important;
          }
          .footer-copyright {
            margin-top: 3rem !important;
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
        .gallery-item-wrapper:hover .gallery-img {
          transform: scale(1.1);
        }
        .gallery-item-wrapper:hover .gallery-dish-name {
          transform: translateY(0) !important;
        }
        .gallery-item-wrapper:hover .gallery-dish-line {
          transform: scaleX(1) !important;
        }
        .gallery-item-wrapper:hover {
          border-color: var(--gold) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
