import React from "react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import "./QuickNavCard.css";

interface QuickNavCardProps {
    to: string;
    title: string;
    description: string;
    hue?: number;
}

export default function QuickNavCard({ to, title, description, hue }: QuickNavCardProps) {
    return (
        <SpotlightCard hue={hue} tilt={6}>
            <Link href={to} className="quick-card">
                <h3 className="quick-title" data-z>
                    {title}
                </h3>
                <p className="quick-desc">{description}</p>
                <span className="quick-go" data-z aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                </span>
            </Link>
        </SpotlightCard>
    );
}

export function QuickNavGrid({ children }: { children: React.ReactNode }) {
    return <div className="quick-grid container">{children}</div>;
}
