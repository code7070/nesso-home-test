"use client";

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useTransition, useEffect, useRef } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "it", label: "IT", flag: "🇮🇹" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: langCode });
    });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-lighter hover:bg-gray-light transition-all active:scale-90"
        aria-label={`Select language. Current: ${currentLanguage.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
          role="listbox"
          aria-label="Language options"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-light transition-colors ${
                lang.code === currentLocale ? "bg-gray-lighter" : ""
              }`}
              role="option"
              aria-selected={lang.code === currentLocale}
            >
              <span>{lang.flag}</span>
              <span className="font-secondary font-medium">{lang.label}</span>
              {lang.code === currentLocale && (
                <svg
                  className="w-4 h-4 ml-auto text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
