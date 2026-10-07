"use client";

import { useEffect } from "react";

/**
 * Loads the New Relic Browser agent for traffic, page-load and error tracking.
 *
 * The three NEXT_PUBLIC_NEW_RELIC_* variables are inlined at build time. The Browser license key is
 * meant to be public (it ends up in the page source), unlike the server-side license key. When any
 * of them is missing, for example in local development, nothing is loaded.
 */
export default function NewRelic() {
    useEffect(() => {
        const licenseKey = process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY;
        const applicationId = process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID;
        const accountId = process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID;
        if (!licenseKey || !applicationId || !accountId) return;
        if (document.getElementById("new-relic-agent")) return;

        const beacon = "bam.eu01.nr-data.net";
        const w = window as unknown as { NREUM?: Record<string, unknown> };
        w.NREUM = w.NREUM ?? {};
        w.NREUM.init = { distributed_tracing: { enabled: true }, privacy: { cookies_enabled: true } };
        w.NREUM.loader_config = { accountID: accountId, trustKey: accountId, agentID: applicationId, licenseKey, applicationID: applicationId };
        w.NREUM.info = { beacon, errorBeacon: beacon, licenseKey, applicationID: applicationId, sa: 1 };

        const script = document.createElement("script");
        script.id = "new-relic-agent";
        script.src = "https://js-agent.newrelic.com/nr-loader-spa-current.min.js";
        script.async = true;
        document.head.appendChild(script);
    }, []);

    return null;
}
