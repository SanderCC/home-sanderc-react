"use client";

import React, { useEffect, useRef } from "react";
import Portrait from "@/components/Portrait";
import CtaLink from "@/components/CtaLink";
import VariableText from "@/components/VariableText";
import { getPointer, prefersReducedMotion, smooth, subscribeFrame } from "@/lib/pointer";
import { useTranslation } from "@/i18n";
import "./Hero.css";

const FLOATS = [
    { label: "React", cls: "f1", depth: 34, delay: 0 },
    { label: ".NET", cls: "f2", depth: 52, delay: -2 },
    { label: "Azure", cls: "f3", depth: 26, delay: -4 },
    { label: "AI", cls: "f4", depth: 60, delay: -1 },
];

export default function Hero() {
    const { t } = useTranslation();
    const stageRef = useRef<HTMLDivElement>(null);

    // Parallax: layers slide by depth, the portrait leans toward the pointer.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || prefersReducedMotion()) return;
        const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-depth]"));
        const photo = stage.querySelector<HTMLElement>(".hero-photo");
        const pointer = getPointer();
        let visible = true;
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        io.observe(stage);
        let cx = 0;
        let cy = 0;

        const stop = subscribeFrame((_, dt) => {
            if (!visible) return;
            const tx = pointer.active ? (pointer.x / window.innerWidth - 0.5) * 2 : 0;
            const ty = pointer.active ? (pointer.y / window.innerHeight - 0.5) * 2 : 0;
            const k = smooth(dt, 220);
            cx += (tx - cx) * k;
            cy += (ty - cy) * k;
            layers.forEach((el) => {
                const d = Number(el.dataset.depth);
                el.style.transform = `translate3d(${(cx * d).toFixed(2)}px, ${(cy * d * 0.7).toFixed(2)}px, 0)`;
            });
            if (photo) photo.style.transform = `perspective(900px) rotateY(${(cx * 5).toFixed(2)}deg) rotateX(${(-cy * 3).toFixed(2)}deg)`;
        });
        return () => {
            stop();
            io.disconnect();
        };
    }, []);

    return (
        <section className="hero container">
            <h1 className="hero-name">
                <VariableText text="Sander Constantin" intro />
            </h1>

            <div className="hero-stage" ref={stageRef}>
                <div className="hero-orb" data-depth="-14" aria-hidden="true">
                    <i className="hero-orb-fill" />
                </div>
                <div className="hero-ring hero-ring-1" aria-hidden="true">
                    <i />
                </div>
                <div className="hero-ring hero-ring-2" aria-hidden="true">
                    <i />
                </div>
                <div className="hero-photo-wrap" data-depth="10">
                    <div className="hero-photo">
                        <Portrait priority />
                    </div>
                </div>
                {FLOATS.map((f) => (
                    <div key={f.label} className={`hero-float ${f.cls}`} data-depth={f.depth} aria-hidden="true">
                        <span className="hero-chip" style={{ animationDelay: `${f.delay}s` }}>
                            {f.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="hero-copy">
                <p className="hero-pill">
                    <span className="hero-pill-dot" aria-hidden="true" />
                    {t("hero.eyebrow")}
                </p>
                <p className="hero-subtitle">{t("hero.subtitle")}</p>
                <div className="hero-actions">
                    <CtaLink to="/portfolio" variant="primary">
                        {t("hero.cta.work")}
                    </CtaLink>
                    <CtaLink href="https://www.linkedin.com/in/sanderconstantin/" variant="secondary" icon>
                        {t("hero.cta.contact")}
                    </CtaLink>
                </div>
            </div>
        </section>
    );
}
