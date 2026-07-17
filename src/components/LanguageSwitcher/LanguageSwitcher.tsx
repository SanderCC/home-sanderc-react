"use client";

import React from "react";
import { Button } from "react-aria-components";
import { useLanguage, LANGS, type Lang } from "@/i18n";
import { useTranslation } from "@/i18n";
import "./LanguageSwitcher.css";

const LABELS: Record<Lang, string> = { en: "EN", nl: "NL", fr: "FR" };

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const { t } = useTranslation();

    return (
        <div className="lang-switcher" role="group" aria-label={t("langSwitcher")}>
            {LANGS.map((code) => (
                <Button
                    key={code}
                    className="lang-switcher-btn"
                    data-active={code === lang || undefined}
                    onPress={() => setLang(code)}
                    aria-pressed={code === lang}
                >
                    {LABELS[code]}
                </Button>
            ))}
        </div>
    );
}
