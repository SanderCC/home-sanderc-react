import React from "react";
import VariableText from "@/components/VariableText";
import "./PageHeader.css";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="page-header container">
            <h1 className="page-title">
                <VariableText text={title} intro />
            </h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
    );
}
