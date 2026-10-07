import React from "react";
import "./Portrait.css";

interface PortraitProps {
    size?: number;
    /** avatar: small round crop. cutout: full transparent photo that fades into the page. */
    variant?: "avatar" | "cutout";
    priority?: boolean;
}

export default function Portrait({ size = 160, variant = "cutout", priority = false }: PortraitProps) {
    return (
        <img
            className={`portrait portrait-${variant}`}
            style={variant === "avatar" ? { width: size, height: size } : undefined}
            src="/sander.png"
            width={800}
            height={792}
            alt={variant === "avatar" ? "" : "Sander Constantin"}
            decoding="async"
            fetchPriority={priority ? "high" : undefined}
            draggable={false}
        />
    );
}
