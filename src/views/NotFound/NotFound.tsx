"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/PageSection";
import CtaLink from "@/components/CtaLink";
import { useTranslation } from "@/i18n";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <>
            <PageHeader title={t("notFound.title")} subtitle={t("notFound.subtitle")} />
            <PageSection>
                <CtaLink to="/" variant="primary">
                    {t("notFound.cta")}
                </CtaLink>
            </PageSection>
        </>
    );
}
