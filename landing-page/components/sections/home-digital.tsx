"use client";

import HeaderSection from "@/components/HeaderSection";
import HomeDigitalVisual from "./home-digital-visual";
import { useSeen } from "@/utils/useSeen";
import DigitalWordingDisplay from "@/components/DigitalWordingDisplay";
import { useTranslations } from "next-intl";

export default function HomeDigital() {
  const t = useTranslations("digital");
  const { ref, isSeen } = useSeen({ triggerOnce: true });
  const wordings = {
    integration: {
      title: t("wordings.integration.title"),
      description: t("wordings.integration.description"),
    },
    automation: {
      title: t("wordings.automation.title"),
      description: t("wordings.automation.description"),
    },
    software: {
      title: t("wordings.software.title"),
      description: t("wordings.software.description"),
    },
  };
  return (
    <section id="workMethod" className="bg-white py-[60px] md:py-[120px]">
      <div
        className="max-w-7xl mx-auto px-4 flex flex-col gap-[72px]"
        ref={ref}
      >
        <HeaderSection
          title={t("title")}
          description={t("description")}
        />
        <div className="grid md:grid-cols-[1fr_minmax(0,480px)_1fr] gap-10">
          <div className="order-2 md:order-1 flex flex-col gap-10 md:gap-[72px] justify-center">
            <DigitalWordingDisplay
              title={wordings.integration.title}
              description={wordings.integration.description}
              className={isSeen ? "scale-100 delay-300" : "scale-75 opacity-0"}
            />
            <DigitalWordingDisplay
              title={wordings.automation.title}
              description={wordings.automation.description}
              className={isSeen ? "scale-100 delay-600" : "scale-75 opacity-0"}
            />
            <div className="md:hidden">
              <DigitalWordingDisplay
                title={wordings.software.title}
                description={wordings.software.description}
                className={
                  isSeen ? "scale-100 delay-[900ms]" : "scale-75 opacity-0"
                }
              />
            </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center w-full">
            <HomeDigitalVisual isSeen={isSeen} />
          </div>
          <div className="hidden md:block flex flex-col gap-10 md:gap-[72px] justify-center">
            <DigitalWordingDisplay
              title={wordings.software.title}
              description={wordings.software.description}
              className={
                isSeen ? "scale-100 delay-[900ms]" : "scale-75 opacity-0"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
