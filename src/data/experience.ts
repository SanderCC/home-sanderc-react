import type { Lang } from "@/i18n";

export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    bullets: string[];
}

export interface SideExperienceItem {
    title: string;
    period: string;
}

export const experience: Record<Lang, ExperienceItem[]> = {
    en: [
        {
            company: "3P",
            role: "Full Stack Developer / Analyst",
            period: "Jul 2023 — Now",
            bullets: [
                "Building and maintaining software with ASP.NET, WinForms and Vue.js.",
                "Working across several projects, including a CRM, facility software, a data warehouse and public procurement software.",
                "Recognised internally as 3P's AI Champion, driving the adoption of AI-assisted development across teams.",
            ],
        },
        {
            company: "Bel'Maison",
            role: "Freelance Full Stack Developer",
            period: "Ongoing",
            bullets: [
                "Built and maintain the Bel'Maison real estate platform and its internal integrations dashboard as an independent freelancer.",
                "See the Portfolio page for links to the live project.",
            ],
        },
        {
            company: "Xplore Group",
            role: "Full Stack Developer (Intern)",
            period: "Apr — Jun 2023",
            bullets: [
                "Built a greenfield project from the ground up using Java and React.",
                "Completed as the internship for my Bachelor's at Karel de Grote Hogeschool.",
            ],
        },
        {
            company: "WorldEscrow",
            role: "Full Stack Developer (Student)",
            period: "2017 — 2023",
            bullets: [
                "Worked with PHP, ASP.NET and React.",
                "Created and maintained the internal ERP system and an industrial planning tool.",
            ],
        },
        {
            company: "Securitas",
            role: "Security Agent (Student)",
            period: "Jul — Aug 2019",
            bullets: ["Reported and responded to on-site issues and events."],
        },
        {
            company: "Andaltech, Sevilla",
            role: "Hardware Technician (Intern)",
            period: "April 2018",
            bullets: ["Assembled and repaired computers, and installed software and operating systems."],
        },
    ],
    nl: [
        {
            company: "3P",
            role: "Full Stack Developer / Analist",
            period: "jul 2023 — nu",
            bullets: [
                "Bouwen en onderhouden van software met ASP.NET, WinForms en Vue.js.",
                "Werkzaam binnen verschillende projecten, waaronder een CRM, facility software, een datawarehouse en software voor overheidsopdrachten.",
                "Intern erkend als AI Champion bij 3P, met een drijvende rol in de adoptie van AI-ondersteunde ontwikkeling binnen de teams.",
            ],
        },
        {
            company: "Bel'Maison",
            role: "Freelance Full Stack Developer",
            period: "Lopend",
            bullets: [
                "Bouw en onderhoud van het Bel'Maison vastgoedplatform en het interne integratiedashboard, als zelfstandig freelancer.",
                "Zie de Portfolio-pagina voor links naar het live project.",
            ],
        },
        {
            company: "Xplore Group",
            role: "Full Stack Developer (Stagiair)",
            period: "apr — jun 2023",
            bullets: [
                "Een greenfield project volledig van nul opgebouwd met Java en React.",
                "Deze stage liep in het kader van mijn bachelor aan Karel de Grote Hogeschool.",
            ],
        },
        {
            company: "WorldEscrow",
            role: "Full Stack Developer (Student)",
            period: "2017 — 2023",
            bullets: [
                "Gewerkt met PHP, ASP.NET en React.",
                "Het interne ERP-systeem en een industriële planningstool gebouwd en onderhouden.",
            ],
        },
        {
            company: "Securitas",
            role: "Security Agent (Student)",
            period: "jul — aug 2019",
            bullets: ["Rapporteren over en reageren op incidenten en gebeurtenissen ter plaatse."],
        },
        {
            company: "Andaltech, Sevilla",
            role: "Hardwaretechnicus (Stagiair)",
            period: "april 2018",
            bullets: ["Computers samengesteld en hersteld, software en besturingssystemen geïnstalleerd."],
        },
    ],
    fr: [
        {
            company: "3P",
            role: "Développeur Full Stack / Analyste",
            period: "juil. 2023 — aujourd'hui",
            bullets: [
                "Développement et maintenance de logiciels avec ASP.NET, WinForms et Vue.js.",
                "Travail sur plusieurs projets, dont un CRM, un logiciel de facility management, un data warehouse et un logiciel de marchés publics.",
                "Reconnu en interne comme AI Champion chez 3P, moteur de l'adoption du développement assisté par IA au sein des équipes.",
            ],
        },
        {
            company: "Bel'Maison",
            role: "Développeur Full Stack indépendant",
            period: "En cours",
            bullets: [
                "Développement et maintenance de la plateforme immobilière Bel'Maison et de son tableau de bord d'intégrations interne, en tant qu'indépendant.",
                "Voir la page Portfolio pour les liens vers le projet en ligne.",
            ],
        },
        {
            company: "Xplore Group",
            role: "Développeur Full Stack (Stagiaire)",
            period: "avr. — juin 2023",
            bullets: [
                "Développement d'un projet greenfield entièrement neuf en Java et React.",
                "Ce stage s'inscrivait dans le cadre de mon bachelier à la Karel de Grote Hogeschool.",
            ],
        },
        {
            company: "WorldEscrow",
            role: "Développeur Full Stack (Étudiant)",
            period: "2017 — 2023",
            bullets: [
                "Travail avec PHP, ASP.NET et React.",
                "Création et maintenance du système ERP interne et d'un outil de planification industrielle.",
            ],
        },
        {
            company: "Securitas",
            role: "Agent de sécurité (Étudiant)",
            period: "juil. — août 2019",
            bullets: ["Signalement et gestion des incidents sur site."],
        },
        {
            company: "Andaltech, Séville",
            role: "Technicien matériel (Stagiaire)",
            period: "avril 2018",
            bullets: ["Assemblage et réparation d'ordinateurs, installation de logiciels et de systèmes d'exploitation."],
        },
    ],
};

export const otherExperience: Record<Lang, SideExperienceItem[]> = {
    en: [
        { title: "Steward, Royal Antwerp FC", period: "2018 — 2019" },
        { title: "Volunteer, Tomorrowland", period: "2017 — 2022" },
    ],
    nl: [
        { title: "Steward, Royal Antwerp FC", period: "2018 — 2019" },
        { title: "Vrijwilliger, Tomorrowland", period: "2017 — 2022" },
    ],
    fr: [
        { title: "Steward, Royal Antwerp FC", period: "2018 — 2019" },
        { title: "Bénévole, Tomorrowland", period: "2017 — 2022" },
    ],
};
