"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "nl" | "fr";

export const LANGS: Lang[] = ["en", "nl", "fr"];

interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("en");

    useEffect(() => {
        const stored = window.localStorage.getItem("lang");
        if (stored && (LANGS as string[]).includes(stored)) {
            setLangState(stored as Lang);
            return;
        }
        const browserLang = window.navigator.language.slice(0, 2);
        if ((LANGS as string[]).includes(browserLang)) {
            setLangState(browserLang as Lang);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
        window.localStorage.setItem("lang", lang);
    }, [lang]);

    const value = useMemo<LanguageContextValue>(() => ({ lang, setLang: setLangState }), [lang]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
}
