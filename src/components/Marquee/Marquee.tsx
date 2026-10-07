import React from "react";
import "./Marquee.css";

export default function Marquee({ items }: { items: string[] }) {
    const row = (hidden: boolean) => (
        <ul className="marquee-row" aria-hidden={hidden || undefined}>
            {items.map((item) => (
                <li key={item} className="marquee-item">
                    {item}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="marquee" data-cursor>
            <div className="marquee-track">
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}
