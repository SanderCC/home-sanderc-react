import type { Lang } from "@/i18n";

export interface Project {
    name: string;
    url: string;
    linkLabel: string;
    description: string;
    tags: string[];
}

export const projects: Record<Lang, Project[]> = {
    en: [
        {
            name: "CiTRadio DJ Platform",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description:
                "A platform built for CiTRadio, giving DJs the tools they need to manage their shows and schedule.",
            tags: ["React"],
        },
        {
            name: "Bel'Maison Integrations",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "An internal integrations dashboard supporting the Bel'Maison real estate platform.",
            tags: ["React", ".NET"],
        },
        {
            name: "Bel'Maison",
            url: "https://wonderful-flower-017777c03.7.azurestaticapps.net/",
            linkLabel: "belmaison.immo",
            description:
                "A French real estate platform for buying and selling residential and commercial property with confidence.",
            tags: ["React", "Real Estate"],
        },
    ],
    nl: [
        {
            name: "CiTRadio DJ-platform",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description: "Een platform gebouwd voor CiTRadio, dat dj's de tools geeft om hun shows en planning te beheren.",
            tags: ["React"],
        },
        {
            name: "Bel'Maison Integraties",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "Een intern integratiedashboard ter ondersteuning van het Bel'Maison vastgoedplatform.",
            tags: ["React", ".NET"],
        },
        {
            name: "Bel'Maison",
            url: "https://wonderful-flower-017777c03.7.azurestaticapps.net/",
            linkLabel: "belmaison.immo",
            description:
                "Een Frans vastgoedplatform om met vertrouwen woningen en commercieel vastgoed te kopen en verkopen.",
            tags: ["React", "Vastgoed"],
        },
    ],
    fr: [
        {
            name: "Plateforme DJ CiTRadio",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description:
                "Une plateforme conçue pour CiTRadio, donnant aux DJ les outils nécessaires pour gérer leurs émissions et leur planning.",
            tags: ["React"],
        },
        {
            name: "Intégrations Bel'Maison",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "Un tableau de bord d'intégrations interne au service de la plateforme immobilière Bel'Maison.",
            tags: ["React", ".NET"],
        },
        {
            name: "Bel'Maison",
            url: "https://wonderful-flower-017777c03.7.azurestaticapps.net/",
            linkLabel: "belmaison.immo",
            description:
                "Une plateforme immobilière française pour acheter et vendre en toute confiance biens résidentiels et commerciaux.",
            tags: ["React", "Immobilier"],
        },
    ],
};
