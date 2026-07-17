"use client";

import React from "react";
import { canHover } from "@/hooks/canHover";
import "./TiltCard.css";

const MAX_TILT = 8;
const LIFT = 6;

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!canHover()) return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `translateY(-${LIFT}px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg)`;
        el.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
        e.currentTarget.style.transform = "";
    }

    return (
        <div className={`tilt-card ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {children}
            <div className="tilt-card-glare" aria-hidden="true" />
        </div>
    );
}
