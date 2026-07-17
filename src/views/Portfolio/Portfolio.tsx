"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ProjectCard, { ProjectGrid } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useTranslation } from "@/i18n";

export default function Portfolio() {
    const { t, lang } = useTranslation();
    const items = projects[lang];

    return (
        <>
            <PageHeader title={t("portfolio.title")} subtitle={t("portfolio.subtitle")} />
            <PageSection>
                <ProjectGrid>
                    {items.map((project, i) => (
                        <Reveal key={project.url} delay={i * 80}>
                            <TiltCard>
                                <ProjectCard {...project} />
                            </TiltCard>
                        </Reveal>
                    ))}
                </ProjectGrid>
            </PageSection>
        </>
    );
}
