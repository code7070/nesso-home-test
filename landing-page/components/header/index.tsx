"use client";

import { useTranslations } from "next-intl";
import HeaderNavigation from "./navigation";
import LanguageSwitcher from "./language-switcher";
import Button from "../button";
import { NessoDigitalLogo } from "../icons/nesso-digital-logo";
import { Link } from "@/src/i18n/navigation";
import { useScrollDetection } from "@/utils/useScrollDetection";
import NessoDigitalIcon from "../icons/nesso-digital-icon";

export default function Header() {
  const t = useTranslations("navigation");

  const { direction } = useScrollDetection();

  return (
    <header
      className={`transition-all duration-500 z-10 fixed left-0 top-0 ring-0 w-full from-white/5 via-white/10 to-white/5 backdrop-blur-lg ${direction === "up" ? "py-[33px]" : "py-[13px]"}`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl px-4 mx-auto">
        <Link href="/#home" aria-label="Nesso Digitale - Go to homepage">
          <span className="hidden md:inline">
            <NessoDigitalLogo />
          </span>
          <span className="md:hidden">
            <NessoDigitalIcon />
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNavigation />
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="hidden lg:block">
          <Link href="#contact">
            <Button className="w-[141px]">{t("contact")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
