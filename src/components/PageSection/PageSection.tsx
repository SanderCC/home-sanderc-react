import React from "react";
import "./PageSection.css";

export default function PageSection({ children }: { children: React.ReactNode }) {
    return <section className="page-section container">{children}</section>;
}
