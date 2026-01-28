"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "../button";
import { ArrowRight } from "../icons/arrow-right";
import ContactModal from "../ContactModal";

export default function FooterContact() {
  const t = useTranslations("footer.cta");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        id="contact"
        className="md:px-5 md:py-8 overflow-hidden border border-primary rounded-4xl bg-white relative"
      >
        <div className="relative rounded-3xl bg-gray-lighter p-10 md:p-20  flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center gap-1 max-w-[712px]">
            <div className="flex flex-col gap-3">
              <div className="text-center">{t("availability")}</div>
              <div className="text-center text-3xl md:text-[2.625em] text-primary leading-[1em] tracking-[-0.03em]">
                {t("question")}
              </div>
            </div>
            <div className="text-sm md:text-base font-light text-gray-dark/60 text-center">
              {t("description")}
            </div>
            <div className="mt-8 flex justify-center">
              <Button className="max-h-[42px]" onClick={openModal}>
                <div className="leading-[0.9em]">{t("button")}</div>
                <div className="size-3 flex items-center justify-center text-primary group-hover:text-white">
                  <ArrowRight
                    size={8}
                    className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-1"
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
