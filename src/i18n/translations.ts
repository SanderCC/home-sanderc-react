import { useLanguage, type Lang } from "./LanguageContext";

export type TranslationKey =
    | "nav.home"
    | "nav.experience"
    | "nav.education"
    | "nav.skills"
    | "nav.portfolio"
    | "nav.about"
    | "skipLink"
    | "themeToggle"
    | "menuToggle"
    | "langSwitcher"
    | "footer.location"
    | "hero.eyebrow"
    | "hero.greeting"
    | "hero.subtitle"
    | "hero.cta.work"
    | "hero.cta.contact"
    | "quick.experience.title"
    | "quick.experience.desc"
    | "quick.education.title"
    | "quick.education.desc"
    | "quick.skills.title"
    | "quick.skills.desc"
    | "quick.portfolio.title"
    | "quick.portfolio.desc"
    | "quick.about.title"
    | "quick.about.desc"
    | "experience.title"
    | "experience.subtitle"
    | "experience.otherHeading"
    | "education.title"
    | "education.subtitle"
    | "education.languagesHeading"
    | "skills.title"
    | "skills.subtitle"
    | "portfolio.title"
    | "portfolio.subtitle"
    | "portfolio.visit"
    | "about.title"
    | "about.subtitle"
    | "about.bio1"
    | "about.bio2"
    | "notFound.title"
    | "notFound.subtitle"
    | "notFound.cta";

export const translations: Record<Lang, Record<TranslationKey, string>> = {
    en: {
        "nav.home": "Home",
        "nav.experience": "Experience",
        "nav.education": "Education",
        "nav.skills": "Skills",
        "nav.portfolio": "Portfolio",
        "nav.about": "About",
        skipLink: "Skip to content",
        themeToggle: "Toggle dark mode",
        menuToggle: "Toggle menu",
        langSwitcher: "Change language",
        "footer.location": "Belgium",
        "hero.eyebrow": "Software Engineer · Belgium",
        "hero.greeting": "Hi, I'm",
        "hero.subtitle":
            "A passionate developer with a diverse skill set and a love for creating innovative solutions — using AI to speed up the process and ship bigger applications in less time.",
        "hero.cta.work": "View my work",
        "hero.cta.contact": "Get in touch",
        "quick.experience.title": "Experience",
        "quick.experience.desc": "Where I've worked and what I've built.",
        "quick.education.title": "Education",
        "quick.education.desc": "What I studied, and where.",
        "quick.skills.title": "Skills",
        "quick.skills.desc": "The languages and tools I reach for.",
        "quick.portfolio.title": "Portfolio",
        "quick.portfolio.desc": "A few things I've shipped for fun.",
        "quick.about.title": "About",
        "quick.about.desc": "A bit more about who I am.",
        "experience.title": "Experience",
        "experience.subtitle":
            "Professional roles, internships and hands-on projects that shaped how I build software.",
        "experience.otherHeading": "Also worth mentioning",
        "education.title": "Education",
        "education.subtitle": "Where I studied, and the languages I speak along the way.",
        "education.languagesHeading": "Languages",
        "skills.title": "Skills",
        "skills.subtitle": "The languages, frameworks and tools I use to build things.",
        "portfolio.title": "Portfolio",
        "portfolio.subtitle": "A few personal projects I've built and shipped for fun.",
        "portfolio.visit": "Visit",
        "about.title": "About",
        "about.subtitle": "A bit more about who I am, outside of the CV bullet points.",
        "about.bio1":
            "I'm Sander, a passionate developer with a diverse skill set and a love for creating innovative solutions. I use AI to speed up the process and ship bigger applications in far less time — without losing sight of quality.",
        "about.bio2":
            "My practical experience comes from professional work, school projects and personal projects alike, and I'm always eager to learn new concepts and skills in an interesting sector.",
        "notFound.title": "Page not found",
        "notFound.subtitle": "The page you're looking for doesn't exist — or has moved.",
        "notFound.cta": "Back to home",
    },
    nl: {
        "nav.home": "Home",
        "nav.experience": "Ervaring",
        "nav.education": "Opleiding",
        "nav.skills": "Vaardigheden",
        "nav.portfolio": "Portfolio",
        "nav.about": "Over mij",
        skipLink: "Ga naar de inhoud",
        themeToggle: "Donkere modus in-/uitschakelen",
        menuToggle: "Menu in-/uitschakelen",
        langSwitcher: "Taal wijzigen",
        "footer.location": "België",
        "hero.eyebrow": "Software Engineer · België",
        "hero.greeting": "Hoi, ik ben",
        "hero.subtitle":
            "Een gedreven ontwikkelaar met een brede vaardighedenset en een passie voor het bouwen van innovatieve oplossingen — met AI werk ik sneller en bouw ik grotere applicaties in minder tijd.",
        "hero.cta.work": "Bekijk mijn werk",
        "hero.cta.contact": "Neem contact op",
        "quick.experience.title": "Ervaring",
        "quick.experience.desc": "Waar ik gewerkt heb en wat ik gebouwd heb.",
        "quick.education.title": "Opleiding",
        "quick.education.desc": "Wat ik studeerde, en waar.",
        "quick.skills.title": "Vaardigheden",
        "quick.skills.desc": "De talen en tools die ik gebruik.",
        "quick.portfolio.title": "Portfolio",
        "quick.portfolio.desc": "Een paar dingen die ik voor de fun gebouwd heb.",
        "quick.about.title": "Over mij",
        "quick.about.desc": "Een beetje meer over wie ik ben.",
        "experience.title": "Ervaring",
        "experience.subtitle":
            "Professionele functies, stages en praktijkprojecten die vormgaven aan hoe ik software bouw.",
        "experience.otherHeading": "Ook nog vermeldenswaardig",
        "education.title": "Opleiding",
        "education.subtitle": "Waar ik studeerde, en de talen die ik onderweg leerde spreken.",
        "education.languagesHeading": "Talen",
        "skills.title": "Vaardigheden",
        "skills.subtitle": "De talen, frameworks en tools waarmee ik dingen bouw.",
        "portfolio.title": "Portfolio",
        "portfolio.subtitle": "Een paar persoonlijke projecten die ik voor de fun gebouwd en gelanceerd heb.",
        "portfolio.visit": "Bezoek",
        "about.title": "Over mij",
        "about.subtitle": "Een beetje meer over wie ik ben, naast de bullet points van mijn cv.",
        "about.bio1":
            "Ik ben Sander, een gedreven ontwikkelaar met een brede vaardighedenset en een passie voor het bouwen van innovatieve oplossingen. Ik gebruik AI om sneller te werken en grotere applicaties in veel minder tijd te bouwen — zonder in te boeten op kwaliteit.",
        "about.bio2":
            "Mijn praktijkervaring komt zowel uit professioneel werk, schoolprojecten als persoonlijke projecten, en ik leer graag nieuwe concepten en vaardigheden bij in een boeiende sector.",
        "notFound.title": "Pagina niet gevonden",
        "notFound.subtitle": "De pagina die je zoekt bestaat niet — of is verplaatst.",
        "notFound.cta": "Terug naar home",
    },
    fr: {
        "nav.home": "Accueil",
        "nav.experience": "Expérience",
        "nav.education": "Formation",
        "nav.skills": "Compétences",
        "nav.portfolio": "Portfolio",
        "nav.about": "À propos",
        skipLink: "Aller au contenu",
        themeToggle: "Activer/désactiver le mode sombre",
        menuToggle: "Ouvrir/fermer le menu",
        langSwitcher: "Changer de langue",
        "footer.location": "Belgique",
        "hero.eyebrow": "Software Engineer · Belgique",
        "hero.greeting": "Bonjour, je suis",
        "hero.subtitle":
            "Un développeur passionné, doté de compétences variées et animé par l'envie de créer des solutions innovantes — j'utilise l'IA pour accélérer le développement et livrer de plus grandes applications en moins de temps.",
        "hero.cta.work": "Voir mes projets",
        "hero.cta.contact": "Me contacter",
        "quick.experience.title": "Expérience",
        "quick.experience.desc": "Où j'ai travaillé et ce que j'ai construit.",
        "quick.education.title": "Formation",
        "quick.education.desc": "Ce que j'ai étudié, et où.",
        "quick.skills.title": "Compétences",
        "quick.skills.desc": "Les langages et outils que j'utilise.",
        "quick.portfolio.title": "Portfolio",
        "quick.portfolio.desc": "Quelques projets réalisés pour le plaisir.",
        "quick.about.title": "À propos",
        "quick.about.desc": "Un peu plus sur qui je suis.",
        "experience.title": "Expérience",
        "experience.subtitle":
            "Postes professionnels, stages et projets concrets qui ont façonné ma façon de développer des logiciels.",
        "experience.otherHeading": "À noter également",
        "education.title": "Formation",
        "education.subtitle": "Où j'ai étudié, et les langues que je parle.",
        "education.languagesHeading": "Langues",
        "skills.title": "Compétences",
        "skills.subtitle": "Les langages, frameworks et outils que j'utilise pour créer.",
        "portfolio.title": "Portfolio",
        "portfolio.subtitle": "Quelques projets personnels que j'ai développés et publiés pour le plaisir.",
        "portfolio.visit": "Visiter",
        "about.title": "À propos",
        "about.subtitle": "Un peu plus sur qui je suis, au-delà des lignes de mon CV.",
        "about.bio1":
            "Je m'appelle Sander, un développeur passionné doté de compétences variées et animé par l'envie de créer des solutions innovantes. J'utilise l'IA pour accélérer le développement et livrer de plus grandes applications en bien moins de temps — sans jamais sacrifier la qualité.",
        "about.bio2":
            "Mon expérience pratique vient aussi bien du travail professionnel que de projets scolaires et personnels, et j'aime toujours apprendre de nouveaux concepts dans un secteur passionnant.",
        "notFound.title": "Page introuvable",
        "notFound.subtitle": "La page que vous recherchez n'existe pas ou a été déplacée.",
        "notFound.cta": "Retour à l'accueil",
    },
};

export function useTranslation() {
    const { lang } = useLanguage();
    const t = (key: TranslationKey): string => translations[lang][key];
    return { t, lang };
}
