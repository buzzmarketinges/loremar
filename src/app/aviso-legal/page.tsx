import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Aviso Legal | Restaurante Loremar",
    description: "Aviso legal e información sobre la titularidad del sitio web de Restaurante Loremar, ubicado en Sabadell, Barcelona.",
    alternates: {
        canonical: "https://restaurantloremar.com/aviso-legal",
    },
};

export default function AvisoLegalPage() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)" }} className="fade-in">

            <Navbar />

            {/* Hero Section */}
            <div style={{
                paddingTop: "140px",
                paddingBottom: "4rem",
                textAlign: "center",
                borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "600px",
                    height: "300px",
                    background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    color: "var(--gold)",
                    fontSize: "0.7rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: "1.2rem",
                    opacity: 0.7,
                }}>
                    <span style={{ width: "30px", height: "1px", backgroundColor: "var(--gold)", display: "inline-block" }} />
                    Información Legal
                    <span style={{ width: "30px", height: "1px", backgroundColor: "var(--gold)", display: "inline-block" }} />
                </div>
                <h1 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    color: "var(--gold)",
                    fontWeight: "normal",
                    letterSpacing: "2px",
                    margin: 0,
                }}>
                    Aviso Legal
                </h1>
            </div>

            {/* Content */}
            <main style={{
                maxWidth: "820px",
                margin: "0 auto",
                padding: "5rem 2rem 6rem 2rem",
                lineHeight: 1.85,
                color: "#bbb",
                fontSize: "0.95rem",
            }}>

                {/* Section 1: Titular */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Datos identificativos del titular</SectionTitle>
                    <p style={{ marginBottom: "1.5rem" }}>
                        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, a continuación se exponen los datos identificativos del titular del presente sitio web:
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                    }} className="info-grid">
                        <InfoCard label="Razón Social" value="Marilor SL" />
                        <InfoCard label="CIF" value="B58089574" />
                        <InfoCard label="Actividad" value="Servicios en restaurantes" />
                        <InfoCard label="CNAE" value="5610 – Restaurantes y puestos de comidas" />
                        <InfoCard label="Forma Jurídica" value="Sociedad Limitada" />
                        <InfoCard label="Sector" value="Hostelería" />
                    </div>
                </section>

                <Divider />

                {/* Section 2: Contacto */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Dirección y Contacto</SectionTitle>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                    }} className="info-grid">
                        <InfoCard label="Dirección" value="Calle Lluís Carreras, 13 – 17, 08208 Sabadell, Barcelona" />
                        <InfoCard label="Teléfono" value="937 17 91 46" link="tel:937179146" />
                        <InfoCard label="Email" value="info@loremar.es" link="mailto:info@loremar.es" />
                        <InfoCard label="Sitio Web" value="www.restaurantloremar.com" link="https://www.restaurantloremar.com" />
                    </div>
                </section>

                <Divider />

                {/* Section 3: Objeto */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Objeto</SectionTitle>
                    <p>
                        El presente sitio web tiene como finalidad dar a conocer al público en general la actividad y los servicios que presta <strong style={{ color: "#ddd" }}>Marilor SL</strong>, operando bajo la marca comercial <strong style={{ color: "var(--gold)" }}>Restaurante Loremar</strong>, así como facilitar la información necesaria para la reserva de mesas y la consulta de nuestras cartas y menús.
                    </p>
                </section>

                <Divider />

                {/* Section 4: Propiedad Intelectual */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Propiedad Intelectual e Industrial</SectionTitle>
                    <p style={{ marginBottom: "1.2rem" }}>
                        Todos los contenidos del sitio web, incluyendo, a título enunciativo pero no limitativo, textos, fotografías, gráficos, imágenes, logotipos, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de <strong style={{ color: "#ddd" }}>Marilor SL</strong> o de terceros que han autorizado su uso, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual sobre los mismos.
                    </p>
                    <p>
                        Queda prohibida la reproducción, transformación, distribución, comunicación pública, puesta a disposición del público y, en general, cualquier otra forma de explotación, parcial o total de los elementos referidos en el apartado anterior. Estos actos de explotación sólo podrán ser realizados previa autorización expresa de <strong style={{ color: "#ddd" }}>Marilor SL</strong> y, en todo caso, deberán hacer referencia explícita a la titularidad de los citados derechos de propiedad intelectual.
                    </p>
                </section>

                <Divider />

                {/* Section 5: Responsabilidad */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Exclusión de Responsabilidad</SectionTitle>
                    <p style={{ marginBottom: "1.2rem" }}>
                        <strong style={{ color: "#ddd" }}>Marilor SL</strong> no se hace responsable de los daños o perjuicios de cualquier tipo producidos en el usuario que traigan causa de fallos o desconexiones en las redes de telecomunicaciones que produzcan la suspensión, cancelación o interrupción del servicio del portal durante la prestación del mismo o con carácter previo.
                    </p>
                    <p>
                        El titular se reserva el derecho de modificar los contenidos de la web sin previo aviso y sin ningún tipo de limitación. Asimismo, declina cualquier responsabilidad por los eventuales daños y perjuicios que puedan ocasionarse por la falta de disponibilidad y/o continuidad de este sitio y de los servicios que se ofrecen en él.
                    </p>
                </section>

                <Divider />

                {/* Section 6: Enlaces */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Enlaces a Terceros</SectionTitle>
                    <p>
                        El sitio web puede incluir enlaces a sitios de terceros. Las páginas pertenecientes a estos terceros no han sido revisadas ni son objeto de controles por parte de <strong style={{ color: "#ddd" }}>Marilor SL</strong>. En ningún caso será responsable de los contenidos de cualquier sitio web enlazado, ni garantiza la disponibilidad técnica, la calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en dichos hipervínculos u otros sitios de Internet.
                    </p>
                </section>

                <Divider />

                {/* Section 7: Protección de datos */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Protección de Datos</SectionTitle>
                    <p style={{ marginBottom: "1.2rem" }}>
                        De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD), le informamos que los datos personales que nos facilite a través de este sitio web serán tratados por <strong style={{ color: "#ddd" }}>Marilor SL</strong> como responsable del tratamiento.
                    </p>
                    <p>
                        El usuario podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad dirigiéndose a la dirección de correo electrónico{" "}
                        <a href="mailto:info@loremar.es" style={{ color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid rgba(212,175,55,0.3)" }}>
                            info@loremar.es
                        </a>
                        {" "}o a la dirección postal indicada anteriormente.
                    </p>
                </section>

                <Divider />

                {/* Section 8: Legislación */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Legislación Aplicable y Jurisdicción</SectionTitle>
                    <p>
                        Las presentes condiciones se rigen y se interpretan de acuerdo con la legislación española. Para cualquier cuestión litigiosa derivada de la existencia, acceso, utilización o contenido del sitio web, tanto <strong style={{ color: "#ddd" }}>Marilor SL</strong> como el usuario renuncian a cualquier otro fuero que pudiera corresponderles, sometiéndose a la jurisdicción de los Juzgados y Tribunales de Sabadell (Barcelona).
                    </p>
                </section>

                {/* Links to related legal pages */}
                <div style={{
                    marginTop: "4rem",
                    padding: "1.5rem 2rem",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "4px",
                }}>
                    <div style={{ color: "#666", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                        Documentos relacionados
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                        <a href="/politica-de-cookies" style={{
                            color: "var(--gold)",
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            borderBottom: "1px solid rgba(212,175,55,0.3)",
                            paddingBottom: "2px",
                        }}>
                            Política de Cookies
                        </a>
                    </div>
                </div>

                {/* Back link */}
                <div style={{ marginTop: "3rem", textAlign: "center" }}>
                    <a href="/" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        color: "var(--gold)",
                        fontSize: "0.75rem",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        border: "1px solid rgba(212,175,55,0.3)",
                        padding: "0.7rem 1.8rem",
                        borderRadius: "2px",
                        transition: "all 0.3s ease",
                    }}
                        className="back-btn"
                    >
                        ← Volver al Inicio
                    </a>
                </div>

            </main>

            <Footer isHome={false} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .back-btn:hover {
                    background-color: rgba(212,175,55,0.08);
                    border-color: var(--gold);
                }
                @media (max-width: 600px) {
                    main {
                        padding: 3rem 1.5rem 4rem 1.5rem !important;
                    }
                    .info-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.4rem",
            fontWeight: "normal",
            color: "var(--gold)",
            marginBottom: "1.2rem",
            letterSpacing: "1px",
        }}>
            {children}
        </h2>
    );
}

function Divider() {
    return (
        <div style={{
            width: "60px",
            height: "1px",
            backgroundColor: "rgba(212,175,55,0.3)",
            margin: "0 0 3.5rem 0",
        }} />
    );
}

function InfoCard({ label, value, link }: { label: string; value: string; link?: string }) {
    return (
        <div style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: "4px",
            padding: "1.2rem 1.5rem",
        }}>
            <div style={{
                color: "var(--gold)",
                fontFamily: "var(--font-serif)",
                fontSize: "0.8rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
                opacity: 0.8,
            }}>
                {label}
            </div>
            {link ? (
                <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel={link.startsWith("http") ? "noopener noreferrer" : undefined} style={{
                    color: "#ddd",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "1px",
                }}>
                    {value}
                </a>
            ) : (
                <div style={{ color: "#ddd", fontSize: "0.95rem" }}>{value}</div>
            )}
        </div>
    );
}
