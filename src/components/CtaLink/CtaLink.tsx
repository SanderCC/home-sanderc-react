import React from "react";
import Link from "next/link";
import "./CtaLink.css";

interface CtaLinkProps {
    to?: string;
    href?: string;
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}

export default function CtaLink({ to, href, variant = "primary", children }: CtaLinkProps) {
    const className = `btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`;

    if (to) {
        return (
            <Link href={to} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
            {children}
        </a>
    );
}
