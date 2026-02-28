"use client";

import React from "react";

// Standard allergen names to icons mapping - Only those with specific icons
export const ALLERGENS_ICONS: Record<string, string> = {
    "Gluten": "gluten_allergen_food_allergens_icon_183663.svg",
    "Crustáceos": "crustaceans_allergen_food_allergens_icon_183662.svg",
    "Huevos": "egg_allergen_food_allergens_icon_183650.svg",
    "Pescado": "fish_allergen_food_allergens_icon_183655.svg",
    "Frutos secos": "nuts_allergen_food_allergens_icon_183660.svg",
    "Soja": "soy_allergen_food_allergens_icon_183654.svg",
    "Lácteos": "milk_allergen_food_allergens_icon_183656.svg",
    "Apio": "celery_allergen_food_allergens_icon_183661.svg",
    "Mostaza": "mustard_allergen_food_allergens_icon_183651.svg",
    "Sésamo": "sesame_allergen_food_allergens_icon_183653.svg",
    "Sulfitos": "sulfites_allergen_food_allergens_icon_183658.svg",
    "Moluscos": "shellfish_allergen_food_allergens_icon_183657.svg"
};

export default function AllergenIcon({ name, showName = false }: { name: string, showName?: boolean }) {
    // Normalize names for mapping (handle old names if they somehow persist in DB)
    let normalizedName = name;
    if (name === "Cacahuetes" || name === "Frutos de cáscara") normalizedName = "Frutos secos";
    if (name.toLowerCase() === "granos de sésamo") normalizedName = "Sésamo";
    if (name === "Dióxido de azufre y sulfitos") normalizedName = "Sulfitos";

    const iconFile = ALLERGENS_ICONS[normalizedName];

    if (!iconFile) return null; // Eliminar los que no tengan icono específico

    const iconPath = `/icons/${iconFile}`;

    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--gold)"
            }}
            title={normalizedName}
        >
            <div
                style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maskImage: `url(${iconPath})`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${iconPath})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    backgroundColor: "var(--gold)"
                }}
            />
            {showName && <span style={{ fontSize: "0.9rem", color: "#ccc" }}>{normalizedName}</span>}
        </div>
    );
}
