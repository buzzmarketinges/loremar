import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Política de Cookies | Restaurante Loremar",
    description: "Información sobre el uso de cookies en la web de Restaurante Loremar, en cumplimiento de la normativa vigente de protección de datos.",
    alternates: {
        canonical: "https://restaurantloremar.com/politica-de-cookies",
    },
};

export default function PoliticaDeCookiesPage() {
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
                {/* Subtle background glow */}
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
                    Aviso Legal
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
                    Política de Cookies
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

                {/* Section 1 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <p>
                        En la web <a href="https://www.restaurantloremar.com" style={{ color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid rgba(212,175,55,0.3)" }}>www.restaurantloremar.com</a> utilizamos cookies para facilitar la relación de los visitantes con nuestro contenido y para permitir elaborar estadísticas sobre las visitantes que recibimos.
                    </p>
                </section>

                {/* Divider */}
                <Divider />

                {/* Section 2 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Marco Legal</SectionTitle>
                    <p>
                        En cumplimiento de la Directiva 2009/136/CE, desarrollada en nuestro ordenamiento por el apartado segundo del artículo 22 de la Ley de Servicios de Sociedad de la Información, siguiendo las directrices de la Agencia Española de Protección de Datos, procedemos a informarle detalladamente del uso que se realiza en nuestra web.
                    </p>
                </section>

                <Divider />

                {/* Section 3 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>¿Qué son las Cookies?</SectionTitle>
                    <p>
                        Se denominan cookies a unos pequeños archivos que se graban en el navegador utilizado por cada visitante de nuestra web para que el servidor pueda recordar la visita de ese usuario con posterioridad cuando vuelva a acceder a nuestros contenidos. Esta información no revela su identidad, ni dato personal alguno, ni accede al contenido almacenado en su pc, pero sí que permite a nuestro sistema identificarle a usted como un usuario determinado que ya visitó la web con anterioridad, visualizó determinadas páginas, etc. y además permite guardar sus preferencias personales e información técnica como por ejemplo las visitas realizadas o páginas concretas que visite.
                    </p>
                    <p style={{ marginTop: "1.2rem" }}>
                        La finalidad de las cookies es la de facilitar al Usuario un acceso más rápido a los Servicios seleccionados.
                    </p>
                </section>

                <Divider />

                {/* Section 4 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Gestión de Cookies</SectionTitle>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Si usted no desea que se guarden cookies en su navegador o prefiere recibir una información cada vez que una cookie solicite instalarse, puede configurar sus opciones de navegación para que se haga de esa forma. La mayor parte de los navegadores permiten la gestión de las cookies de 3 formas diferentes:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
                        {[
                            "Las cookies son siempre rechazadas",
                            "El navegador pregunta si el usuario desea instalar cada cookie",
                            "Las cookies son siempre aceptadas",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>◆</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Su navegador también puede incluir la posibilidad de seleccionar con detalle las cookies que desea que se instalen en su ordenador. En concreto, el usuario puede normalmente aceptar alguna de las siguientes opciones:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        {[
                            "Rechazar las cookies de determinados dominios",
                            "Rechazar las cookies de terceros",
                            "Aceptar cookies como no persistentes (se eliminan cuando el navegador se cierra)",
                            "Permitir al servidor crear cookies para un dominio diferente",
                        ].map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>◆</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <Divider />

                {/* Section 5 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Configuración de Navegadores</SectionTitle>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Para permitir, conocer, bloquear o eliminar las cookies instaladas en su equipo puede hacerlo mediante la configuración de las opciones del navegador instalado en su ordenador. Puede encontrar información sobre cómo configurar los navegadores más usados en las siguientes ubicaciones:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {[
                            {
                                name: "Internet Explorer",
                                path: "Herramientas → Opciones de Internet → Privacidad → Configuración",
                                support: "soporte de Microsoft",
                                url: "https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies",
                            },
                            {
                                name: "Firefox",
                                path: "Herramientas → Opciones → Privacidad → Historial → Configuración Personalizada",
                                support: "soporte de Mozilla",
                                url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
                            },
                            {
                                name: "Chrome",
                                path: "Configuración → Mostrar opciones avanzadas → Privacidad → Configuración de contenido",
                                support: "soporte de Google",
                                url: "https://support.google.com/chrome/answer/95647?hl=es",
                            },
                            {
                                name: "Safari",
                                path: "Preferencias → Seguridad",
                                support: "soporte de Apple",
                                url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
                            },
                        ].map((browser) => (
                            <div key={browser.name} style={{
                                backgroundColor: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(212,175,55,0.1)",
                                borderRadius: "4px",
                                padding: "1.2rem 1.5rem",
                            }}>
                                <div style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontSize: "1rem", marginBottom: "0.4rem" }}>
                                    {browser.name}
                                </div>
                                <div style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.5rem" }}>{browser.path}</div>
                                <div style={{ fontSize: "0.85rem" }}>
                                    Para más información, puede consultar el{" "}
                                    <a href={browser.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid rgba(212,175,55,0.3)" }}>
                                        {browser.support}
                                    </a>{" "}
                                    o la Ayuda del navegador.
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Divider />

                {/* Section 6 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Cookies de Terceros</SectionTitle>
                    <p>
                        Respecto de las cookies de terceros, es decir aquellas que son ajenas a nuestro sitio web, no podemos hacernos responsables del contenido y veracidad de las políticas de privacidad que ellos incluyen por lo que la información que le ofrecemos es siempre con referencia a la fuente.
                    </p>
                </section>

                <Divider />

                {/* Section 7 */}
                <section style={{ marginBottom: "3.5rem" }}>
                    <SectionTitle>Modificación de la Política de Cookies</SectionTitle>
                    <p style={{ marginBottom: "1.2rem" }}>
                        Se puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos, por ello se aconseja a los Usuarios que la visiten periódicamente.
                    </p>
                    <p>
                        Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicarán a los Usuarios bien mediante la web o a través de correo electrónico a los Usuarios registrados.
                    </p>
                </section>

                {/* Related documents */}
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
                        <a href="/aviso-legal" style={{
                            color: "var(--gold)",
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            borderBottom: "1px solid rgba(212,175,55,0.3)",
                            paddingBottom: "2px",
                        }}>
                            Aviso Legal
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
