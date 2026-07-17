import React from "react";
import "./Chip.css";

interface ChipProps {
    children: React.ReactNode;
    variant?: "default" | "accent";
    delay?: number;
}

export default function Chip({ children, variant = "default", delay }: ChipProps) {
    return (
        <span
            className={`chip ${variant === "accent" ? "chip-accent" : ""}`}
            style={delay !== undefined ? { animationDelay: `${delay}ms` } : undefined}
        >
            {children}
        </span>
    );
}
