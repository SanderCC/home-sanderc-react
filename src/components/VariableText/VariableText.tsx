"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { getPointer, prefersReducedMotion, smooth, subscribeFrame } from "@/lib/pointer";
import "./VariableText.css";

interface VariableTextProps {
    text: string;
    as?: "h1" | "h2" | "span" | "p";
    className?: string;
    /** Play one sweep across the letters on mount. */
    intro?: boolean;
    /** Pointer influence radius in px. */
    radius?: number;
}

const REST = { wght: 560, wdth: 80 };
const PEAK = { wght: 800, wdth: 100 };

/**
 * Display type on Bricolage Grotesque's weight + width axes. Letters swell as the
 * pointer (mouse or finger) comes near; an optional single intro sweep plays on mount.
 */
export default function VariableText({ text, as: Tag = "span", className = "", intro = false, radius = 190 }: VariableTextProps) {
    const rootRef = useRef<HTMLElement>(null);
    const words = useMemo(() => text.split(" "), [text]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || prefersReducedMotion()) return;
        const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
        const values = letters.map(() => 0);
        const pointer = getPointer();
        let visible = true;
        const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "80px" });
        io.observe(root);

        const start = performance.now() + 250;
        const sweepMs = 1500;
        const n = letters.length;

        const stop = subscribeFrame((time, dt) => {
            if (!visible) return;
            const k = smooth(dt, 85);
            const sweeping = intro && time - start < sweepMs + 600;
            const sweepPos = ((time - start) / sweepMs) * (n + 4) - 2;

            const centers = letters.map((el) => {
                const r = el.getBoundingClientRect();
                return [r.left + r.width / 2, r.top + r.height / 2] as const;
            });

            letters.forEach((el, i) => {
                let target = 0;
                if (pointer.active) {
                    const d = Math.hypot(pointer.x - centers[i][0], (pointer.y - centers[i][1]) * 1.4);
                    target = Math.max(0, 1 - d / radius) ** 2;
                }
                if (sweeping && time > start) {
                    const d = Math.abs(i - sweepPos);
                    target = Math.max(target, Math.max(0, 1 - d / 2.2) ** 2);
                }
                const prev = values[i];
                const next = prev + (target - prev) * k;
                if (Math.abs(next - prev) < 0.002 && (next === 0 || Math.abs(next - target) < 0.002)) return;
                values[i] = next;
                const wght = REST.wght + (PEAK.wght - REST.wght) * next;
                const wdth = REST.wdth + (PEAK.wdth - REST.wdth) * next;
                el.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}, "wdth" ${wdth.toFixed(1)}`;
            });
        });

        return () => {
            stop();
            io.disconnect();
        };
    }, [intro, radius, text]);

    let index = 0;
    return (
        <Tag ref={rootRef as never} className={`vt ${className}`} aria-label={text}>
            {words.map((word, wi) => (
                <React.Fragment key={wi}>
                    <span className="vt-word" aria-hidden="true">
                        {Array.from(word).map((ch) => (
                            <span key={index} className="vt-letter" data-l={index++}>
                                {ch}
                            </span>
                        ))}
                    </span>
                    {wi < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </Tag>
    );
}
