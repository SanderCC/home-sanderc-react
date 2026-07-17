import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/inter";
import "@/css/theme.css";
import { ThemeProvider } from "@/theme/ThemeContext";
import { LanguageProvider } from "@/i18n";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
    metadataBase: new URL("https://sanderc.net"),
    title: {
        default: "Sander Constantin — Software Engineer",
        template: "%s — Sander Constantin",
    },
    description:
        "Sander Constantin — Software Engineer in Belgium. Experience, education, skills and a portfolio of personal projects.",
    icons: {
        icon: "https://avatars.githubusercontent.com/u/58855319?v=4",
    },
    manifest: "/manifest.json",
    openGraph: {
        type: "website",
        siteName: "Sander Constantin",
        title: "Sander Constantin — Software Engineer",
        description:
            "Sander Constantin — Software Engineer in Belgium. Experience, education, skills and a portfolio of personal projects.",
        images: ["https://avatars.githubusercontent.com/u/58855319?v=4"],
    },
    twitter: {
        card: "summary",
        title: "Sander Constantin — Software Engineer",
        description: "Software Engineer in Belgium. Experience, education, skills and a portfolio of personal projects.",
        images: ["https://avatars.githubusercontent.com/u/58855319?v=4"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <LanguageProvider>
                        <Layout>{children}</Layout>
                    </LanguageProvider>
                </ThemeProvider>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-GME7FWE6QL"
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-GME7FWE6QL');`}
                </Script>
            </body>
        </html>
    );
}
