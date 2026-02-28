"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

export default function DishImageModal({ imageUrl, altText }: { imageUrl: string, altText: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--gold)",
                    display: "inline-flex",
                    alignItems: "center"
                }}
                title="Ver foto del plato"
            >
                <Camera size={20} />
            </button>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="backdrop-blur fade-in"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.7)"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                        }}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "rgba(0,0,0,0.5)",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.2rem"
                            }}
                        >
                            ×
                        </button>
                        <img
                            src={imageUrl}
                            alt={altText}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "80vh",
                                objectFit: "contain",
                                display: "block"
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
