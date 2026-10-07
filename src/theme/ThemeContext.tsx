"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    // The inline script in <head> has already set data-theme before first paint; just sync to it.
    useEffect(() => {
        const current = document.documentElement.getAttribute("data-theme");
        if (current === "light" || current === "dark") setTheme(current);
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            toggleTheme: () => {
                const next: Theme = theme === "light" ? "dark" : "light";
                const apply = () => {
                    document.documentElement.setAttribute("data-theme", next);
                    setTheme(next);
                    try {
                        window.localStorage.setItem("theme", next);
                    } catch {}
                };
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                const start = (document as unknown as { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
                if (start && !reduced) start.call(document, apply);
                else apply();
            },
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}
