"use client";

import React, { useEffect, useRef } from "react";
import { getPointer, prefersReducedMotion, smooth, subscribeFrame } from "@/lib/pointer";
import "./Backdrop.css";

const BURST_COLORS = ["var(--violet)", "var(--aqua)", "var(--amber)", "var(--rose)"];

/**
 * Fixed atmosphere behind everything: drifting aurora, a cursor spotlight that lights
 * up a dot grid, a trailing cursor ring, and a small particle burst on every press.
 */
export default function Backdrop() {
    const rootRef = useRef<HTMLDivElement>(null);
    const spotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const burstRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const spot = spotRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        const burst = burstRef.current;
        if (!root || !spot || !ring || !dot || !burst) return;

        const reduced = prefersReducedMotion();
        const pointer = getPointer();
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let sx = window.innerWidth / 2;
        let sy = window.innerHeight / 3;
        let rx = sx;
        let ry = sy;
        let ringScale = 1;
        let shown = 0;

        const stop = reduced
            ? () => {}
            : subscribeFrame((_, dt) => {
                  if (pointer.active) {
                      sx += (pointer.x - sx) * smooth(dt, 140);
                      sy += (pointer.y - sy) * smooth(dt, 140);
                  }
                  spot.style.transform = `translate3d(${sx - 360}px, ${sy - 360}px, 0)`;
                  root.style.setProperty("--mx", `${sx.toFixed(0)}px`);
                  root.style.setProperty("--my", `${sy.toFixed(0)}px`);

                  if (!finePointer) return;
                  rx += (pointer.x - rx) * smooth(dt, 70);
                  ry += (pointer.y - ry) * smooth(dt, 70);
                  const targetScale = pointer.down ? 0.7 : pointer.interactive ? 1.9 : 1;
                  ringScale += (targetScale - ringScale) * smooth(dt, 90);
                  shown += ((pointer.active ? 1 : 0) - shown) * smooth(dt, 120);
                  ring.style.opacity = shown.toFixed(2);
                  dot.style.opacity = shown.toFixed(2);
                  ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${ringScale.toFixed(3)})`;
                  dot.style.transform = `translate3d(${pointer.x - 3}px, ${pointer.y - 3}px, 0)`;
              });

        const onDown = (e: PointerEvent) => {
            if (reduced) return;
            for (let i = 0; i < 9; i++) {
                const p = document.createElement("i");
                p.className = "burst-dot";
                p.style.left = `${e.clientX}px`;
                p.style.top = `${e.clientY}px`;
                p.style.background = BURST_COLORS[i % BURST_COLORS.length];
                burst.appendChild(p);
                const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.6;
                const dist = 26 + Math.random() * 30;
                const anim = p.animate(
                    [
                        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
                        {
                            transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0.2)`,
                            opacity: 0,
                        },
                    ],
                    { duration: 520, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
                );
                anim.onfinish = () => p.remove();
            }
        };
        window.addEventListener("pointerdown", onDown, { passive: true });

        return () => {
            stop();
            window.removeEventListener("pointerdown", onDown);
        };
    }, []);

    return (
        <>
            <div className="backdrop" ref={rootRef} aria-hidden="true">
                <div className="aurora">
                    <i className="blob blob-1" />
                    <i className="blob blob-2" />
                    <i className="blob blob-3" />
                </div>
                <div className="dotgrid" />
                <div className="spot" ref={spotRef} />
                <div className="grain" />
            </div>
            <div className="burst-layer" ref={burstRef} aria-hidden="true" />
            <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
            <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
        </>
    );
}
