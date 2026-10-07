"use client";

import React from "react";
import "./SocialLinks.css";

const links = [
    { label: "GitHub", url: "https://github.com/SanderCC" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sanderconstantin/" },
    { label: "PayPal", url: "https://paypal.me/SanderC" },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <ul className={`social-links ${className}`}>
            {links.map((link) => (
                <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noreferrer" className="social-link" data-cursor>
                        {link.label}
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                    </a>
                </li>
            ))}
        </ul>
    );
}
