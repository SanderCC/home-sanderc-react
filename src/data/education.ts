import type { Lang } from "@/i18n";

export interface EducationItem {
    school: string;
    program: string;
    period: string;
}

export interface LanguageItem {
    name: string;
    note?: string;
}

export const education: Record<Lang, EducationItem[]> = {
    en: [
        { school: "Karel de Grote Hogeschool", program: "Applied Computer Science (Bachelor)", period: "2019 — 2023" },
        { school: "Sint-Norbertusinstituut, Antwerp", program: "Integrated Security", period: "2018 — 2019" },
        { school: "Sint-Ursula-Instituut, Lier", program: "Applied Informatics", period: "2016 — 2018" },
    ],
    nl: [
        { school: "Karel de Grote Hogeschool", program: "Toegepaste Informatica (Bachelor)", period: "2019 — 2023" },
        { school: "Sint-Norbertusinstituut, Antwerpen", program: "Integrale Veiligheid", period: "2018 — 2019" },
        { school: "Sint-Ursula-Instituut, Lier", program: "Toegepaste Informatica", period: "2016 — 2018" },
    ],
    fr: [
        { school: "Karel de Grote Hogeschool", program: "Informatique appliquée (Bachelier)", period: "2019 — 2023" },
        { school: "Sint-Norbertusinstituut, Anvers", program: "Sécurité intégrée", period: "2018 — 2019" },
        { school: "Sint-Ursula-Instituut, Lier", program: "Informatique appliquée", period: "2016 — 2018" },
    ],
};

export const languages: Record<Lang, LanguageItem[]> = {
    en: [{ name: "Dutch", note: "Native" }, { name: "English" }, { name: "French" }],
    nl: [{ name: "Nederlands", note: "Moedertaal" }, { name: "Engels" }, { name: "Frans" }],
    fr: [{ name: "Néerlandais", note: "Langue maternelle" }, { name: "Anglais" }, { name: "Français" }],
};
