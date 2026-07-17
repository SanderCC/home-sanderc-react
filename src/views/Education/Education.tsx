"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import Timeline, { TimelineItem } from "@/components/Timeline";
import Chip from "@/components/Chip";
import { education, languages } from "@/data/education";
import { useTranslation } from "@/i18n";

export default function Education() {
    const { t, lang } = useTranslation();
    const items = education[lang];
    const langItems = languages[lang];

    return (
        <>
            <PageHeader title={t("education.title")} subtitle={t("education.subtitle")} />
            <PageSection>
                <Timeline>
                    {items.map((item, i) => (
                        <TimelineItem
                            key={item.school}
                            title={item.program}
                            subtitle={item.school}
                            period={item.period}
                            delay={i * 80}
                        />
                    ))}
                </Timeline>

                <h2 className="section-subheading">{t("education.languagesHeading")}</h2>
                <div className="chip-list">
                    {langItems.map((item) => (
                        <Chip key={item.name}>
                            {item.name}
                            {item.note && <span className="text-muted"> · {item.note}</span>}
                        </Chip>
                    ))}
                </div>
            </PageSection>
        </>
    );
}
