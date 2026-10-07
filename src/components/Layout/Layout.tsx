"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "react-aria-components";
import ThemeToggle from "@/components/ThemeToggle";
import SocialLinks from "@/components/SocialLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Backdrop from "@/components/Backdrop";
import VariableText from "@/components/VariableText";
import CtaLink from "@/components/CtaLink";
import Portrait from "@/components/Portrait";
import { useTranslation } from "@/i18n";
import "./Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);
    const pathname = usePathname();
    const { t, lang } = useTranslation();
    const navRef = useRef<HTMLElement>(null);

    const NAV_ITEMS = [
        { to: "/", label: t("nav.home") },
        { to: "/experience", label: t("nav.experience") },
        { to: "/education", label: t("nav.education") },
        { to: "/skills", label: t("nav.skills") },
        { to: "/portfolio", label: t("nav.portfolio") },
        { to: "/about", label: t("nav.about") },
    ];
    const isActive = (to: string) => (to === "/" ? pathname === "/" : !!pathname?.startsWith(to));
    const activeIndex = NAV_ITEMS.findIndex((item) => isActive(item.to));
    const indicatorIndex = hovered ?? activeIndex;

    useEffect(() => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname]);

    // sliding pill under the nav links
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const place = () => {
            const link = nav.querySelectorAll<HTMLElement>("a")[indicatorIndex];
            if (!link) {
                nav.removeAttribute("data-ready");
                return;
            }
            nav.style.setProperty("--ix", `${link.offsetLeft}px`);
            nav.style.setProperty("--iw", `${link.offsetWidth}px`);
            nav.setAttribute("data-ready", "");
        };
        place();
        window.addEventListener("resize", place);
        return () => window.removeEventListener("resize", place);
    }, [indicatorIndex, lang]);

    // lock page scroll + Escape while the mobile menu is open
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("keydown", onKey);
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.documentElement.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <div className="site">
            <Backdrop />
            <a href="#main" className="skip-link">
                {t("skipLink")}
            </a>

            <header className="site-header">
                <div className="header-pill">
                    <Link href="/" className="brand" aria-label="Sander Constantin">
                        <span className="brand-avatar">
                            <Portrait variant="avatar" size={36} />
                        </span>
                        <span className="brand-name">Sander</span>
                    </Link>

                    <nav ref={navRef} className="site-nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
                        <span className="site-nav-indicator" aria-hidden="true" />
                        {NAV_ITEMS.map((item, i) => (
                            <Link
                                key={item.to}
                                href={item.to}
                                className={`site-nav-link ${isActive(item.to) ? "site-nav-link-active" : ""}`}
                                aria-current={isActive(item.to) ? "page" : undefined}
                                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                                onFocus={() => setHovered(i)}
                                onBlur={() => setHovered(null)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <span className="header-lang">
                            <LanguageSwitcher />
                        </span>
                        <ThemeToggle />
                        <Button
                            className="nav-toggle"
                            aria-label={t("menuToggle")}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onPress={() => setMenuOpen((open) => !open)}
                        >
                            <span className="nav-toggle-bar nav-toggle-bar-1" />
                            <span className="nav-toggle-bar nav-toggle-bar-2" />
                        </Button>
                    </div>
                </div>
            </header>

            <div id="mobile-menu" className={`menu ${menuOpen ? "menu-open" : ""}`} aria-hidden={!menuOpen}>
                <nav className="menu-nav" aria-label="Mobile">
                    {NAV_ITEMS.map((item, i) => (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`menu-link ${isActive(item.to) ? "menu-link-active" : ""}`}
                            style={{ "--i": i } as React.CSSProperties}
                            tabIndex={menuOpen ? 0 : -1}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="menu-foot" style={{ "--i": NAV_ITEMS.length } as React.CSSProperties}>
                    <LanguageSwitcher />
                </div>
            </div>

            <main id="main" className="site-main">
                {children}
            </main>

            <footer className="site-footer">
                <div className="container">
                    <div className="footer-cta">
                        <a
                            className="footer-cta-link"
                            href="https://www.linkedin.com/in/sanderconstantin/"
                            target="_blank"
                            rel="noreferrer"
                            data-cursor
                        >
                            <VariableText text={t("footer.cta")} as="span" radius={220} />
                        </a>
                        <CtaLink href="https://www.linkedin.com/in/sanderconstantin/" variant="primary" icon>
                            {t("hero.cta.contact")}
                        </CtaLink>
                    </div>
                    <div className="footer-row">
                        <SocialLinks />
                        <p className="footer-note">
                            © {new Date().getFullYear()} Sander Constantin, {t("footer.location")}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
