"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { NessoDigitalLogo } from "../icons/nesso-digital-logo";
import GooglePlusIcon from "../icons/google-plus-icon";
import FacebookIcon from "../icons/facbook-icon";
import TwitterIcon from "../icons/twitter-icon.";
import InstagramIcon from "../icons/instagram-icon";

export default function FooterContent() {
  const t = useTranslations("navigation");
  const tFooter = useTranslations("footer");

  const navigationMap = [
    { name: t("home"), url: "#home" },
    { name: t("service"), url: "#service" },
    { name: t("sector"), url: "#project" },
    { name: t("workMethod"), url: "#workMethod" },
    { name: t("whoUs"), url: "#article" },
  ];

  return (
    <div className="p-4 md:px-12 md:py-[52px] border-t border-slate/30 flex flex-col md:flex-row gap-10 md:gap-[100px]">
      <div className="md:w-2/5">
        <NessoDigitalLogo />
        <div className="mt-2.5 text-lg leading-6 text-slate/70">
          {tFooter("tagline")}
        </div>
        <div className="mt-7 flex items-center gap-6 ">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://plus.google.com"
            className="text-slate/40 hover:text-slate"
            aria-label="Visit our Google Plus page"
          >
            <GooglePlusIcon aria-hidden="true" />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.com"
            className="text-slate/40 hover:text-slate"
            aria-label="Visit our Facebook page"
          >
            <FacebookIcon aria-hidden="true" />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com"
            className="text-slate/40 hover:text-slate"
            aria-label="Visit our Twitter page"
          >
            <TwitterIcon aria-hidden="true" />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com"
            className="text-slate/40 hover:text-slate"
            aria-label="Visit our Instagram page"
          >
            <InstagramIcon aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
        {/* Col 2 - Menus */}
        <div>
          <h4 className="text-gray-dark font-semibold">{tFooter("menus")}</h4>
          <div className="mt-5 grid grid-flow-col grid-rows-3 gap-x-8 gap-y-4">
            {navigationMap.map((item, index) => (
              <Link
                key={`footer-nav-${index}`}
                href={item.url}
                className="text-gray underline hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 - Contatti */}
        <div>
          <h4 className="text-gray-dark font-semibold">{tFooter("contacts")}</h4>
          <div className="mt-5">
            <Link
              href="mailto:info@example.com"
              className="text-gray underline hover:text-primary transition-colors"
            >
              info@example.com
            </Link>
          </div>
          <div className="mt-5 text-gray">
            {tFooter("address")}
          </div>
        </div>
      </div>
    </div>
  );
}
