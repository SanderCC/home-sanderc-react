"use client";

import React, { useRef } from "react";
import Link from "next/link";
import "./CtaLink.css";

interface CtaLinkProps {
    to?: string;
    href?: string;
    variant?: "primary" | "secondary";
    /** Show the up-right arrow (for links that leave the site). */
    icon?: boolean;
    children: React.ReactNode;
}

export default function CtaLink({ to, href, variant = "primary", icon = false, children }: CtaLinkProps) {
    const ref = useRef<HTMLElement>(null);
    const className = `btn btn-${variant}`;

    // magnetic pull: the button leans toward the pointer, its label leans a little further
    function onMove(e: React.PointerEvent<HTMLElement>) {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.setProperty("--tx", `${(dx * 0.22).toFixed(1)}px`);
        el.style.setProperty("--ty", `${(dy * 0.32).toFixed(1)}px`);
        el.style.setProperty("--lx", `${(dx * 0.1).toFixed(1)}px`);
        el.style.setProperty("--ly", `${(dy * 0.14).toFixed(1)}px`);
        el.style.setProperty("--shine", `${(((e.clientX - r.left) / r.width) * 100).toFixed(0)}%`);
        el.setAttribute("data-moving", "");
    }
    function onLeave() {
        const el = ref.current;
        if (!el) return;
        ["--tx", "--ty", "--lx", "--ly"].forEach((p) => el.style.removeProperty(p));
        el.removeAttribute("data-moving");
    }

    const content = (
        <span className="btn-label">
            {children}
            {icon && (
                <svg className="btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                </svg>
            )}
        </span>
    );

    if (to) {
        return (
            <Link ref={ref as never} href={to} className={className} onPointerMove={onMove} onPointerLeave={onLeave} data-cursor>
                {content}
            </Link>
        );
    }

    return (
        <a ref={ref as never} href={href} target="_blank" rel="noreferrer" className={className} onPointerMove={onMove} onPointerLeave={onLeave} data-cursor>
            {content}
        </a>
    );
}
