"use client";

import React from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import QuickNavCard, { QuickNavGrid } from "@/components/QuickNavCard";
import { skillGroups } from "@/data/skills";
import { useTranslation } from "@/i18n";

export default function Home() {
    const { t, lang } = useTranslation();
    const skills = skillGroups[lang].flatMap((group) => group.items);

    const QUICK_LINKS = [
        { to: "/experience", hue: 258, title: t("quick.experience.title"), description: t("quick.experience.desc") },
        { to: "/education", hue: 172, title: t("quick.education.title"), description: t("quick.education.desc") },
        { to: "/skills", hue: 32, title: t("quick.skills.title"), description: t("quick.skills.desc") },
        { to: "/portfolio", hue: 330, title: t("quick.portfolio.title"), description: t("quick.portfolio.desc") },
        { to: "/about", hue: 205, title: t("quick.about.title"), description: t("quick.about.desc") },
    ];

    return (
        <>
            <Hero />
            <Reveal className="home-marquee">
                <Marquee items={skills} />
            </Reveal>
            <QuickNavGrid>
                {QUICK_LINKS.map((item, i) => (
                    <Reveal key={item.to} delay={i * 70}>
                        <QuickNavCard {...item} />
                    </Reveal>
                ))}
            </QuickNavGrid>
        </>
    );
}
