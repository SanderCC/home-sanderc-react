"use client";

import { useEffect } from "react";

/**
 * Loads the Traces browser agent (page views, route changes, Web Vitals, JS errors, fetch spans).
 *
 * NEXT_PUBLIC_TRACES_ENDPOINT and NEXT_PUBLIC_TRACES_KEY are inlined at build time. The ingest key is
 * public by design (write-only). When either is missing, for example in local development, nothing
 * is loaded. Traces sets no cookies and records the path only, so no consent gate is needed.
 */
export default function Traces() {
    useEffect(() => {
        const endpoint = process.env.NEXT_PUBLIC_TRACES_ENDPOINT;
        const key = process.env.NEXT_PUBLIC_TRACES_KEY;
        if (!endpoint || !key) return;
        if (document.getElementById("traces-agent")) return;

        const script = document.createElement("script");
        script.id = "traces-agent";
        script.src = `${endpoint}/browser/traces.js`;
        script.async = true;
        script.dataset.endpoint = endpoint;
        script.dataset.key = key;
        script.dataset.service = "sanderc.net website";
        document.head.appendChild(script);
    }, []);

    return null;
}
