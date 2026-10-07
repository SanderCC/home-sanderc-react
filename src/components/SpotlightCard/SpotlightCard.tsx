"use client";

import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, subscribeFrame } from "@/lib/pointer";
import "./SpotlightCard.css";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    /** Max tilt in degrees. 0 disables tilt (spotlight still follows the pointer). */
    tilt?: number;
    /** Hue (0-360) for the spotlight tint. Defaults to the accent. */
    hue?: number;
    as?: "div" | "article" | "li";
}

/**
 * A surface that tilts toward the pointer on a spring, with a spotlight that lights the
 * border and the glass under the cursor. Children marked `data-z` float off the surface.
 */
export default function SpotlightCard({ children, className = "", tilt = 7, hue, as: Tag = "div" }: SpotlightCardProps) {
    const ref = useRef<HTMLElement>(null);
    const sim = useRef({ rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, stop: null as null | (() => void) });

    useEffect(() => {
        const s = sim.current;
        return () => s.stop?.();
    }, []);

    function run() {
        const s = sim.current;
        if (s.stop) return;
        s.stop = subscribeFrame((_, dt) => {
            const el = ref.current;
            if (!el) return;
            const h = Math.min(dt, 32) / 1000;
            // damped spring: stiffness 170, damping 17
            s.vx += ((s.tx - s.rx) * 170 - s.vx * 17) * h;
            s.vy += ((s.ty - s.ry) * 170 - s.vy * 17) * h;
            s.rx += s.vx * h;
            s.ry += s.vy * h;
            el.style.transform = `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
            const settled = Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.tx - s.rx) + Math.abs(s.ty - s.ry) < 0.02;
            if (settled && s.tx === 0 && s.ty === 0) {
                el.style.transform = "";
                s.stop?.();
                s.stop = null;
            }
        });
    }

    function onMove(e: React.PointerEvent<HTMLElement>) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--sx", `${(e.clientX - r.left).toFixed(0)}px`);
        el.style.setProperty("--sy", `${(e.clientY - r.top).toFixed(0)}px`);
        if (e.pointerType !== "mouse" || !tilt || prefersReducedMotion()) return;
        sim.current.tx = (0.5 - py) * 2 * tilt;
        sim.current.ty = (px - 0.5) * 2 * tilt;
        run();
    }

    function onLeave() {
        sim.current.tx = 0;
        sim.current.ty = 0;
        if (sim.current.stop || sim.current.rx || sim.current.ry) run();
    }

    return (
        <Tag
            ref={ref as never}
            className={`sc ${className}`}
            style={hue !== undefined ? ({ "--hue": hue } as React.CSSProperties) : undefined}
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={onLeave}
            data-cursor
        >
            <div className="sc-bg" aria-hidden="true" />
            <div className="sc-body">{children}</div>
        </Tag>
    );
}
