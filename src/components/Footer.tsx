import React from "react";
import { MapPin, Phone, Instagram, Facebook, Globe } from "lucide-react";

export default function Footer({ isHome = false }: { isHome?: boolean }) {
  return (
    <>
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
          <div>© {new Date().getFullYear()} Restaurante Loremar. Tradición y Excelencia.</div>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", fontSize: "0.75rem" }}>
            <a href="/aviso-legal" style={{ color: "inherit", textDecoration: "none" }}>Aviso Legal</a>
            <a href="/politica-de-cookies" style={{ color: "inherit", textDecoration: "none" }}>Política de Cookies</a>
          </div>
          <div style={{ fontSize: "0.75rem" }}>
            {isHome ? (
              <>Web desarrollada por la <a href="https://novamarketing.es/agencia-de-marketing-digital-en-sabadell/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>agencia de marketing de Sabadell Nova Marketing</a></>
            ) : (
              <>Web desarrollada por la agencia de marketing de Sabadell Nova Marketing</>
            )}
          </div>
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 900px) {
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
      `}} />
    </>
  );
}
