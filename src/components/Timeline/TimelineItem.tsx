import React from "react";
import Reveal from "@/components/Reveal";

interface TimelineItemProps {
    title: string;
    subtitle?: string;
    period: string;
    bullets?: string[];
    delay?: number;
}

export default function TimelineItem({ title, subtitle, period, bullets, delay = 0 }: TimelineItemProps) {
    return (
        <Reveal delay={delay} className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
                <div className="timeline-header">
                    <span className="timeline-role">{title}</span>
                    <span className="timeline-period">{period}</span>
                </div>
                {subtitle && <span className="timeline-company">{subtitle}</span>}
                {bullets && bullets.length > 0 && (
                    <ul className="timeline-bullets">
                        {bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                )}
            </div>
        </Reveal>
    );
}
