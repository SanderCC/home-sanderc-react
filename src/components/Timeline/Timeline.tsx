import React from "react";
import "./Timeline.css";

export default function Timeline({ children }: { children: React.ReactNode }) {
    return <ol className="timeline">{children}</ol>;
}
