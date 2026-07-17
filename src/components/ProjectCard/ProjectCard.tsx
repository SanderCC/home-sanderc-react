"use client";

import React from "react";
import { Link } from "react-aria-components";
import Chip from "@/components/Chip";
import { useTranslation } from "@/i18n";
import "./ProjectCard.css";

interface ProjectCardProps {
    name: string;
    url: string;
    linkLabel: string;
    description: string;
    tags: string[];
}

export default function ProjectCard({ name, url, linkLabel, description, tags }: ProjectCardProps) {
    const { t } = useTranslation();

    return (
        <article className="project-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="project-tags">
                {tags.map((tag) => (
                    <Chip key={tag} variant="accent">
                        {tag}
                    </Chip>
                ))}
            </div>
            <Link href={url} target="_blank" rel="noreferrer" className="project-link">
                {t("portfolio.visit")} {linkLabel} →
            </Link>
        </article>
    );
}

export function ProjectGrid({ children }: { children: React.ReactNode }) {
    return <div className="project-grid">{children}</div>;
}
