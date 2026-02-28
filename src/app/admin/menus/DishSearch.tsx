"use client";

import { useState, useEffect, useRef } from "react";

interface Dish {
    id: string;
    name: string;
    description: string;
    price: string;
    allergens: string; // JSON
    imageUrl: string;
}

interface DishSearchProps {
    onSelect: (dish: Dish) => void;
}

export default function DishSearch({ onSelect }: DishSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Dish[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/dishes?search=${encodeURIComponent(query)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error(err);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div ref={wrapperRef} style={{ position: "relative", width: "100%", marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "0.4rem" }}>
                🔍 Buscar plato existente
            </label>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Escribe el nombre de un plato..."
                style={{
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "4px",
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    border: "1px dashed var(--gold)",
                    color: "white",
                    fontSize: "0.9rem"
                }}
                onFocus={() => query.length >= 2 && setIsOpen(true)}
            />

            {isOpen && results.length > 0 && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    backgroundColor: "#1a1a1a",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    marginTop: "4px"
                }}>
                    {results.map((dish) => (
                        <div
                            key={dish.id}
                            onClick={() => {
                                onSelect(dish);
                                setQuery("");
                                setIsOpen(false);
                            }}
                            style={{
                                padding: "0.8rem",
                                borderBottom: "1px solid #333",
                                cursor: "pointer",
                                transition: "background 0.2s"
                            }}
                            className="search-result-item"
                        >
                            <div style={{ fontWeight: "bold", color: "var(--gold)" }}>{dish.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#888" }}>{dish.price} - {dish.description?.substring(0, 50)}...</div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .search-result-item:hover {
                    background-color: rgba(212, 175, 55, 0.1);
                }
            `}</style>
        </div>
    );
}
