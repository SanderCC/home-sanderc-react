import React from "react";
import Link from "next/link";
import "./QuickNavCard.css";

interface QuickNavCardProps {
    to: string;
    title: string;
    description: string;
}

export default function QuickNavCard({ to, title, description }: QuickNavCardProps) {
    return (
        <Link href={to} className="quick-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </Link>
    );
}

export function QuickNavGrid({ children }: { children: React.ReactNode }) {
    return <div className="quick-grid container">{children}</div>;
}
