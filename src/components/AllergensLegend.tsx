"use client";

import { Info } from "lucide-react";
import AllergenIcon, { ALLERGENS_ICONS } from "./AllergenIcon";

export default function AllergensLegend() {
    const allergenKeys = Object.keys(ALLERGENS_ICONS);

    return (
        <section style={{
            position: "relative",
            zIndex: 10,
            marginTop: "2rem",
            padding: "2.5rem 1rem",
            backgroundColor: "#000", // Solid black background
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            width: "100%"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.9rem", fontWeight: "bold" }}>
                <Info size={18} /> <span>Leyenda de Alérgenos</span>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)", // 6 columns
                gap: "1.5rem 0.5rem",
                width: "100%",
                maxWidth: "1000px",
                margin: "0 auto"
            }}>
                {allergenKeys.map(key => (
                    <div key={key} style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.6rem",
                        textAlign: "center"
                    }}>
                        <AllergenIcon name={key} />
                        <span style={{
                            fontSize: "0.75rem",
                            color: "#ccc",
                            fontWeight: "400",
                            letterSpacing: "0.5px"
                        }}>
                            {key}
                        </span>
                    </div>
                ))}
            </div>

            <p style={{
                marginTop: "1rem",
                color: "#666",
                fontSize: "0.75rem",
                textAlign: "center",
                maxWidth: "700px",
                lineHeight: "1.6",
                borderTop: "1px solid #111",
                paddingTop: "1rem"
            }}>
                Información alimentaria: Según el Reglamento (UE) Nº 1169/2011, disponemos de la información sobre alérgenos. Consúltenos.
            </p>
        </section>
    );
}
