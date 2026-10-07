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
            name: "CITRadio DJ Platform",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description:
                "A platform built for CITRadio, giving DJs the tools they need to manage their shows and schedule.",
            tags: ["Radio", "Scheduling"],
        },
        {
            name: "Bel'Maison Integrations",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "An internal integrations dashboard supporting the Bel'Maison real estate platform.",
            tags: ["Real Estate", "Dashboard"],
        },
        {
            name: "Bel'Maison",
            url: "https://belmaison-seo.sanderc.net/en",
            linkLabel: "belmaison-seo.sanderc.net",
            description:
                "A French real estate platform for buying and selling residential and commercial property with confidence.",
            tags: ["Real Estate", "Website"],
        },
        {
            name: "W&M Tent Service",
            url: "https://wmtentservice.sanderc.net",
            linkLabel: "wmtentservice.sanderc.net",
            description:
                "A monitoring dashboard that keeps an eye on the heating devices of W&M Tent Service.",
            tags: ["Dashboard", "Monitoring"],
        },
        {
            name: "HaspelPlanner",
            url: "https://haspelplanner.sanderc.net",
            linkLabel: "haspelplanner.sanderc.net",
            description:
                "Plan customer visits, calculate the best route and register sales on the road.",
            tags: ["Planning", "Routes"],
        },
        {
            name: "SupportersClub.net",
            url: "https://supportersclub.net",
            linkLabel: "supportersclub.net",
            description:
                "A platform to find and join a supporters club, get tickets and share events with all members.",
            tags: ["Community", "Events"],
        },
        {
            name: "KBFKB",
            url: "https://kbfkb.be",
            linkLabel: "kbfkb.be",
            description:
                "The official website of the Royal Billiards Federation Klein-Brabant, with clubs, calendar, results and rankings.",
            tags: ["Billiards", "Website"],
        },
    ],
    nl: [
        {
            name: "CITRadio DJ-platform",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description: "Een platform gebouwd voor CITRadio, dat dj's de tools geeft om hun shows en planning te beheren.",
            tags: ["Radio", "Planning"],
        },
        {
            name: "Bel'Maison Integraties",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "Een intern integratiedashboard ter ondersteuning van het Bel'Maison vastgoedplatform.",
            tags: ["Vastgoed", "Dashboard"],
        },
        {
            name: "Bel'Maison",
            url: "https://belmaison-seo.sanderc.net/en",
            linkLabel: "belmaison-seo.sanderc.net",
            description:
                "Een Frans vastgoedplatform om met vertrouwen woningen en commercieel vastgoed te kopen en verkopen.",
            tags: ["Vastgoed", "Website"],
        },
        {
            name: "W&M Tent Service",
            url: "https://wmtentservice.sanderc.net",
            linkLabel: "wmtentservice.sanderc.net",
            description:
                "Een monitoringdashboard dat de verwarmingstoestellen van W&M Tent Service in de gaten houdt.",
            tags: ["Dashboard", "Monitoring"],
        },
        {
            name: "HaspelPlanner",
            url: "https://haspelplanner.sanderc.net",
            linkLabel: "haspelplanner.sanderc.net",
            description:
                "Plan je klantbezoeken, bereken de beste route en registreer je verkoop onderweg.",
            tags: ["Planning", "Routes"],
        },
        {
            name: "SupportersClub.net",
            url: "https://supportersclub.net",
            linkLabel: "supportersclub.net",
            description:
                "Een platform om een supportersclub te vinden en lid te worden, tickets te bestellen en evenementen met alle leden te delen.",
            tags: ["Community", "Evenementen"],
        },
        {
            name: "KBFKB",
            url: "https://kbfkb.be",
            linkLabel: "kbfkb.be",
            description:
                "De officiële website van de Koninklijke Biljartfederatie Klein-Brabant, met clubs, kalender, uitslagen en rangschikking.",
            tags: ["Biljart", "Website"],
        },
    ],
    fr: [
        {
            name: "Plateforme DJ CITRadio",
            url: "https://dj.citradio.net",
            linkLabel: "dj.citradio.net",
            description:
                "Une plateforme conçue pour CITRadio, donnant aux DJ les outils nécessaires pour gérer leurs émissions et leur planning.",
            tags: ["Radio", "Planification"],
        },
        {
            name: "Intégrations Bel'Maison",
            url: "https://belmaison.sanderc.net",
            linkLabel: "belmaison.sanderc.net",
            description: "Un tableau de bord d'intégrations interne au service de la plateforme immobilière Bel'Maison.",
            tags: ["Immobilier", "Tableau de bord"],
        },
        {
            name: "Bel'Maison",
            url: "https://belmaison-seo.sanderc.net/en",
            linkLabel: "belmaison-seo.sanderc.net",
            description:
                "Une plateforme immobilière française pour acheter et vendre en toute confiance biens résidentiels et commerciaux.",
            tags: ["Immobilier", "Site web"],
        },
        {
            name: "W&M Tent Service",
            url: "https://wmtentservice.sanderc.net",
            linkLabel: "wmtentservice.sanderc.net",
            description:
                "Un tableau de bord de suivi qui surveille les appareils de chauffage de W&M Tent Service.",
            tags: ["Tableau de bord", "Suivi"],
        },
        {
            name: "HaspelPlanner",
            url: "https://haspelplanner.sanderc.net",
            linkLabel: "haspelplanner.sanderc.net",
            description:
                "Planifiez vos visites clients, calculez le meilleur itinéraire et enregistrez vos ventes en déplacement.",
            tags: ["Planification", "Itinéraires"],
        },
        {
            name: "SupportersClub.net",
            url: "https://supportersclub.net",
            linkLabel: "supportersclub.net",
            description:
                "Une plateforme pour trouver et rejoindre un club de supporters, obtenir des billets et partager des événements avec tous les membres.",
            tags: ["Communauté", "Événements"],
        },
        {
            name: "KBFKB",
            url: "https://kbfkb.be",
            linkLabel: "kbfkb.be",
            description:
                "Le site officiel de la Fédération Royale de Billard Klein-Brabant, avec clubs, calendrier, résultats et classement.",
            tags: ["Billard", "Site web"],
        },
    ],
};
