"use client";

import React from "react";
import { Switch } from "react-aria-components";
import { useTheme } from "@/theme/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch isSelected={theme === "dark"} onChange={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
            <span className="theme-toggle-track">
                <span className="theme-toggle-icon theme-toggle-icon-sun" aria-hidden="true">
                    ☀
                </span>
                <span className="theme-toggle-icon theme-toggle-icon-moon" aria-hidden="true">
                    ☾
                </span>
                <span className="theme-toggle-thumb" />
            </span>
        </Switch>
    );
}
