"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import Portrait from "@/components/Portrait";
import Chip from "@/components/Chip";
import { favorites } from "@/data/skills";
import { useTranslation } from "@/i18n";
import "./About.css";

export default function About() {
    const { t, lang } = useTranslation();
    const favs = favorites[lang];

    return (
        <>
            <PageHeader title={t("about.title")} subtitle={t("about.subtitle")} />
            <PageSection>
                <div className="about-grid">
                    <div>
                        <p>{t("about.bio1")}</p>
                        <p>{t("about.bio2")}</p>
                        <div className="chip-list">
                            {favs.map((f) => (
                                <Chip key={f.label}>
                                    <strong>{f.label}</strong> — {f.value}
                                </Chip>
                            ))}
                        </div>
                    </div>
                    <div className="about-side">
                        <Portrait size={200} />
                    </div>
                </div>
            </PageSection>
        </>
    );
}
