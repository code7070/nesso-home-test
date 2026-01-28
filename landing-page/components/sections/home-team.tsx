"use client";

import HeaderSection from "@/components/HeaderSection";
import TeamTextGroup from "@/components/TeamTextGroup";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeTeam() {
  const t = useTranslations("team");

  const briefs = [
    {
      title: t("briefs.twoServices.title"),
      description: t("briefs.twoServices.description"),
      image: "/assets/nesso-team_compressed.jpg",
    },
    {
      title: t("briefs.quality.title"),
      description: t("briefs.quality.description"),
      image: "/assets/nesso-team-2_compressed.jpg",
    },
    {
      title: t("briefs.focus.title"),
      description: t("briefs.focus.description"),
      image: "/assets/nesso-team-3_compressed.jpg",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const intr = setInterval(
      () => setActive((curr) => (curr + 1) % briefs.length),
      3000,
    );
    return () => clearInterval(intr);
  }, []);

  return (
    <section id="team" className="bg-gray-lighter">
      <div className="max-w-7xl mx-auto px-4 py-[42px] flex flex-col gap-8 justify-start">
        <HeaderSection title={t("title")} />
        <div className="w-full grid md:grid-cols-2 gap-9">
          <div className="relative w-full aspect-[4/3] md:aspect-[2/1.5] md:max-h-[316px]">
            {briefs.map((b, i) => (
              <Image
                key={i}
                className={`object-cover size-full grayscale-100  absolute left-0 top-0 transition-all duration-500 ${active === i ? "opacity-100 scale-100 delay-500" : "opacity-0 scale-90"}`}
                alt="Nesso Digitale team members collaborating"
                src={b.image}
                fill
              />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {briefs.map((brief, index) => {
              return (
                <TeamTextGroup
                  key={index}
                  {...brief}
                  isActive={active === index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
