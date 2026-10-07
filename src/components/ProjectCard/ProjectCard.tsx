"use client";

import React from "react";
import Chip from "@/components/Chip";
import SpotlightCard from "@/components/SpotlightCard";
import { useTranslation } from "@/i18n";
import "./ProjectCard.css";

interface ProjectCardProps {
    name: string;
    url: string;
    linkLabel: string;
    description: string;
    tags: string[];
}

function hueFor(name: string) {
    let h = 0;
    for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
}

export default function ProjectCard({ name, url, linkLabel, description, tags }: ProjectCardProps) {
    const { t } = useTranslation();
    const hue = hueFor(name);

    return (
        <SpotlightCard as="article" hue={hue} tilt={5}>
            <div className="project">
                <div className="project-info">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className="project-tags">
                        {tags.map((tag) => (
                            <Chip key={tag} variant="accent">
                                {tag}
                            </Chip>
                        ))}
                    </div>
                    <a href={url} target="_blank" rel="noreferrer" className="project-link">
                        <span>
                            {t("portfolio.visit")} {linkLabel}
                        </span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                    </a>
                </div>
            </div>
        </SpotlightCard>
    );
}

export function ProjectGrid({ children }: { children: React.ReactNode }) {
    return <div className="project-grid">{children}</div>;
}
