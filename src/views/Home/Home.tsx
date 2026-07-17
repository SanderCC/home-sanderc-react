"use client";

import React from "react";
import RotatingEarth from "@/components/RotatingEarth";
import Portrait from "@/components/Portrait";
import CtaLink from "@/components/CtaLink";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import QuickNavCard, { QuickNavGrid } from "@/components/QuickNavCard";
import { useTranslation } from "@/i18n";
import "./Home.css";

export default function Home() {
    const { t } = useTranslation();

    const QUICK_LINKS = [
        { to: "/experience", title: t("quick.experience.title"), description: t("quick.experience.desc") },
        { to: "/education", title: t("quick.education.title"), description: t("quick.education.desc") },
        { to: "/skills", title: t("quick.skills.title"), description: t("quick.skills.desc") },
        { to: "/portfolio", title: t("quick.portfolio.title"), description: t("quick.portfolio.desc") },
        { to: "/about", title: t("quick.about.title"), description: t("quick.about.desc") },
    ];

    return (
        <>
            <section className="hero">
                <div className="stars" aria-hidden="true" />
                <div className="container hero-inner">
                    <div className="hero-earth">
                        <RotatingEarth />
                        <div className="hero-portrait">
                            <Portrait size={72} />
                        </div>
                    </div>
                    <div className="hero-text">
                        <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
                        <h1 className="hero-title">
                            {t("hero.greeting")} <span>Sander Constantin</span>
                        </h1>
                        <p className="hero-subtitle">{t("hero.subtitle")}</p>
                        <div className="hero-actions">
                            <CtaLink to="/portfolio" variant="primary">
                                {t("hero.cta.work")}
                            </CtaLink>
                            <CtaLink href="https://www.linkedin.com/in/sanderconstantin/" variant="secondary">
                                {t("hero.cta.contact")}
                            </CtaLink>
                        </div>
                    </div>
                </div>
            </section>

            <QuickNavGrid>
                {QUICK_LINKS.map((item, i) => (
                    <Reveal key={item.to} delay={i * 80}>
                        <TiltCard>
                            <QuickNavCard {...item} />
                        </TiltCard>
                    </Reveal>
                ))}
            </QuickNavGrid>
        </>
    );
}
