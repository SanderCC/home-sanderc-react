import React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/css/theme.css";
import { ThemeProvider } from "@/theme/ThemeContext";
import { LanguageProvider } from "@/i18n";
import Layout from "@/components/Layout";
import NewRelic from "@/components/NewRelic";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f5f4fb" },
        { media: "(prefers-color-scheme: dark)", color: "#08080f" },
    ],
};

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export const metadata: Metadata = {
    metadataBase: new URL("https://sanderc.net"),
    title: {
        default: "Sander Constantin — Software Engineer",
        template: "%s — Sander Constantin",
    },
    description:
        "Sander Constantin — Software Engineer in Belgium. Experience, education, skills and a portfolio of personal projects.",
    icons: {
        icon: "/sander.png",
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
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body>
                <ThemeProvider>
                    <LanguageProvider>
                        <Layout>{children}</Layout>
                    </LanguageProvider>
                </ThemeProvider>
                <NewRelic />
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
