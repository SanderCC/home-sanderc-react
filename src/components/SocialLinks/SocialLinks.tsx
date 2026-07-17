"use client";

import React from "react";
import { Link } from "react-aria-components";
import "./SocialLinks.css";

interface SocialLink {
    label: string;
    url: string;
    icon: string;
}

const links: SocialLink[] = [
    {
        label: "GitHub",
        url: "https://github.com/SanderCC",
        icon: "https://github.githubassets.com/favicons/favicon.png",
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sanderconstantin/",
        icon: "https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8",
    },
    {
        label: "Malt",
        url: "https://www.malt.be/profile/sanderconstantin",
        icon: "https://www.google.com/s2/favicons?domain=malt.be&sz=64",
    },
    {
        label: "PayPal",
        url: "https://paypal.me/SanderC",
        icon: "https://www.paypalobjects.com/webstatic/icon/pp32.png",
    },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`social-links ${className}`}>
            {links.map((link) => (
                <Link key={link.label} href={link.url} target="_blank" rel="noreferrer" className="social-link">
                    <img src={link.icon} alt="" width={18} height={18} />
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    );
}
