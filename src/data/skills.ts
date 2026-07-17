import type { Lang } from "@/i18n";

export interface SkillGroup {
    category: string;
    items: string[];
}

const CLOUD_DEVOPS_ITEMS = [
    "Azure",
    "DevOps",
    "Infrastructure as Code (IaC)",
    "Server Deployment & Configuration",
    "Deployment & Cost Advisory",
    "Docker",
];

export const skillGroups: Record<Lang, SkillGroup[]> = {
    en: [
        { category: "Frontend", items: ["React", "Vue", "Angular", "JavaScript / TypeScript"] },
        { category: "Backend", items: ["C# / .NET", "Java / Spring", "Python", "PHP"] },
        { category: "Data & Messaging", items: ["SQL", "SQL Server", "MySQL", "MongoDB", "NoSQL", "RabbitMQ"] },
        { category: "Cloud & DevOps", items: CLOUD_DEVOPS_ITEMS },
    ],
    nl: [
        { category: "Front-end", items: ["React", "Vue", "Angular", "JavaScript / TypeScript"] },
        { category: "Back-end", items: ["C# / .NET", "Java / Spring", "Python", "PHP"] },
        { category: "Data & messaging", items: ["SQL", "SQL Server", "MySQL", "MongoDB", "NoSQL", "RabbitMQ"] },
        { category: "Cloud & DevOps", items: CLOUD_DEVOPS_ITEMS },
    ],
    fr: [
        { category: "Front-end", items: ["React", "Vue", "Angular", "JavaScript / TypeScript"] },
        { category: "Back-end", items: ["C# / .NET", "Java / Spring", "Python", "PHP"] },
        { category: "Données & messagerie", items: ["SQL", "SQL Server", "MySQL", "MongoDB", "NoSQL", "RabbitMQ"] },
        { category: "Cloud & DevOps", items: CLOUD_DEVOPS_ITEMS },
    ],
};

export interface Favorite {
    label: string;
    value: string;
}

export const favorites: Record<Lang, Favorite[]> = {
    en: [
        { label: "Favorite stack", value: ".NET & React" },
        { label: "Day to day", value: ".NET & Vue.js" },
        { label: "Also strong in", value: "Azure, DevOps & server infrastructure" },
        { label: "Open to", value: "Evening & weekend projects" },
    ],
    nl: [
        { label: "Favoriete stack", value: ".NET & React" },
        { label: "Dagelijkse basis", value: ".NET & Vue.js" },
        { label: "Ook sterk in", value: "Azure, DevOps & serverinfrastructuur" },
        { label: "Beschikbaar voor", value: "Avond- en weekendprojecten" },
    ],
    fr: [
        { label: "Stack favori", value: ".NET & React" },
        { label: "Au quotidien", value: ".NET & Vue.js" },
        { label: "Également solide en", value: "Azure, DevOps & infrastructure serveur" },
        { label: "Disponible pour", value: "Projets en soirée et le week-end" },
    ],
};
