"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../button";
import LanguageSwitcher from "./language-switcher";
import { NessoDigitalLogo } from "../icons/nesso-digital-logo";

export default function HeaderNavigation() {
  const t = useTranslations("navigation");
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationMap = [
    { name: t("home"), url: "#home" },
    { name: t("service"), url: "#service" },
    { name: t("sector"), url: "#project" },
    { name: t("workMethod"), url: "#workMethod" },
    { name: t("whoUs"), url: "#article" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    // Observe all sections based on their actual IDs
    const sectionIds = ["home", "service", "project", "workMethod", "article"];
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigationClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "";
  };

  return (
    <>
      <Button
        className="lg:hidden relative z-[60]"
        variant="outline"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        )}
      </Button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden z-50 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col px-6 py-8">
          {/* Header: Logo */}
          <div
            className={`transition-all duration-300 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
            style={{ transitionDelay: isMenuOpen ? "100ms" : "0ms" }}
          >
            <NessoDigitalLogo />
          </div>

          {/* Navigation Items - Right aligned, staggered */}
          <nav className="flex-1 flex flex-col justify-center" role="navigation" aria-label="Main navigation">
            <ul className="flex flex-col gap-6 items-end">
              {navigationMap.map((item, index) => {
                const sectionId = item.url.replace("#", "");
                const isActive = activeSection === sectionId;
                const delay = 150 + index * 50; // Staggered: 150ms, 200ms, 250ms...

                return (
                  <li
                    key={`${item.url}-${index}`}
                    className={`flex items-center gap-1.5 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${delay}ms` : "0ms",
                    }}
                  >
                    <div
                      className={`h-6 ${isActive ? "w-6" : "w-0"} flex items-center justify-center transition-all`}
                    >
                      {isActive && (
                        <div className="size-1.5 rounded-full bg-black pop-out-bounce" />
                      )}
                    </div>
                    <Link
                      href={item.url}
                      onClick={() => handleNavigationClick(sectionId)}
                      className={`active:scale-95 active:duration-150 font-secondary transition-all ${
                        isActive ? "text-black" : "text-gray"
                      } hover:text-primary font-normal text-xl`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher - After nav items */}
            <div
              className={`flex justify-end mt-8 transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
            >
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Footer: Contact Button - Full width, prominent */}
          <div
            className={`transition-all duration-300 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMenuOpen ? "450ms" : "0ms" }}
          >
            <Button className="w-full justify-center">{t("contact")}</Button>
          </div>
        </div>
      </div>
      <nav className="flex items-center py-3 px-[31px] bg-gray-lighter rounded-full hidden lg:block" role="navigation" aria-label="Main navigation">
        <ul className="flex items-center justify-center gap-[54px]">
          {navigationMap.map((item, index) => {
            const sectionId = item.url.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li
                key={`${item.url}-${index}`}
                className="flex items-center gap-1.5"
              >
                <div
                  key={sectionId}
                  className={`h-6 ${isActive ? "w-6" : "w-0"} flex items-center justify-center transition-all`}
                >
                  {isActive && (
                    <div className="size-1.5 rounded-full bg-black pop-out-bounce" />
                  )}
                </div>
                <Link
                  href={item.url}
                  onClick={() => handleNavigationClick(sectionId)}
                  className={`active:scale-95 active:duration-150 font-secondary transition-all ${isActive ? "text-black" : "text-gray"} hover:text-primary font-normal`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
