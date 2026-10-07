"use client";

import React, { useRef } from "react";
import { Switch } from "react-aria-components";
import { useTheme } from "@/theme/ThemeContext";
import { useTranslation } from "@/i18n";
import "./ThemeToggle.css";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const ref = useRef<HTMLLabelElement>(null);

    function handleChange() {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
            document.documentElement.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
            document.documentElement.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
        }
        toggleTheme();
    }

    return (
        <Switch ref={ref} isSelected={theme === "dark"} onChange={handleChange} className="theme-toggle" aria-label={t("themeToggle")}>
            <svg className="tt-icon tt-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="tt-icon tt-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
            </svg>
        </Switch>
    );
}
