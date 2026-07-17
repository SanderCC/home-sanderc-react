"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "react-aria-components";
import ThemeToggle from "@/components/ThemeToggle";
import SocialLinks from "@/components/SocialLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n";
import "./Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useTranslation();

    const NAV_ITEMS = [
        { to: "/", label: t("nav.home") },
        { to: "/experience", label: t("nav.experience") },
        { to: "/education", label: t("nav.education") },
        { to: "/skills", label: t("nav.skills") },
        { to: "/portfolio", label: t("nav.portfolio") },
        { to: "/about", label: t("nav.about") },
    ];

    useEffect(() => {
        setMenuOpen(false);
        window.scrollTo({ top: 0 });
    }, [pathname]);

    return (
        <div className="site">
            <a href="#main" className="skip-link">
                {t("skipLink")}
            </a>
            <header className="site-header">
                <div className="container header-inner">
                    <Link href="/" className="brand">
                        Sander Constantin
                    </Link>

                    <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Primary">
                        {NAV_ITEMS.map((item) => {
                            const isActive = item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
                            return (
                                <Link
                                    key={item.to}
                                    href={item.to}
                                    className={`site-nav-link ${isActive ? "site-nav-link-active" : ""}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="header-actions">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Button
                            className="nav-toggle"
                            aria-label={t("menuToggle")}
                            aria-expanded={menuOpen}
                            onPress={() => setMenuOpen((open) => !open)}
                        >
                            <span className={`nav-toggle-bar ${menuOpen ? "nav-toggle-bar-open" : ""}`} />
                        </Button>
                    </div>
                </div>
            </header>

            <main id="main" className="site-main">
                {children}
            </main>

            <footer className="site-footer">
                <div className="container footer-inner">
                    <SocialLinks />
                    <p className="footer-note">
                        © {new Date().getFullYear()} Sander Constantin · {t("footer.location")}
                    </p>
                </div>
            </footer>
        </div>
    );
}
