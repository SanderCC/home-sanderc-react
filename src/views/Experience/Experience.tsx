"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import Timeline, { TimelineItem } from "@/components/Timeline";
import Chip from "@/components/Chip";
import { experience, otherExperience } from "@/data/experience";
import { useTranslation } from "@/i18n";

export default function Experience() {
    const { t, lang } = useTranslation();
    const items = experience[lang];
    const otherItems = otherExperience[lang];

    return (
        <>
            <PageHeader title={t("experience.title")} subtitle={t("experience.subtitle")} />
            <PageSection>
                <Timeline>
                    {items.map((item, i) => (
                        <TimelineItem
                            key={item.company}
                            title={item.role}
                            subtitle={item.company}
                            period={item.period}
                            bullets={item.bullets}
                            delay={i * 80}
                        />
                    ))}
                </Timeline>

                <h2 className="section-subheading">{t("experience.otherHeading")}</h2>
                <div className="chip-list">
                    {otherItems.map((item) => (
                        <Chip key={item.title}>
                            {item.title} · <span className="text-muted">{item.period}</span>
                        </Chip>
                    ))}
                </div>
            </PageSection>
        </>
    );
}
