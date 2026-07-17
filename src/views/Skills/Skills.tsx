"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import Reveal from "@/components/Reveal";
import Chip from "@/components/Chip";
import { skillGroups, favorites } from "@/data/skills";
import { useTranslation } from "@/i18n";
import "./Skills.css";

export default function Skills() {
    const { t, lang } = useTranslation();
    const groups = skillGroups[lang];
    const favs = favorites[lang];

    return (
        <>
            <PageHeader title={t("skills.title")} subtitle={t("skills.subtitle")} />
            <PageSection>
                <div className="chip-list favorites-list">
                    {favs.map((f) => (
                        <Chip key={f.label}>
                            <strong>{f.label}</strong> — {f.value}
                        </Chip>
                    ))}
                </div>

                {groups.map((group, gi) => (
                    <Reveal key={group.category} delay={gi * 80}>
                        <h2 className="section-subheading">{group.category}</h2>
                        <div className="chip-grid">
                            {group.items.map((item, i) => (
                                <Chip key={item} delay={i * 40}>
                                    {item}
                                </Chip>
                            ))}
                        </div>
                    </Reveal>
                ))}
            </PageSection>
        </>
    );
}
