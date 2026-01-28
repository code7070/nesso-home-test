import Button from "@/components/button";
import { ArrowRight } from "@/components/icons/arrow-right";
import { BrandBokingLogo } from "@/components/icons/brand-boking-logo";
import { BrandIeaLogo } from "@/components/icons/brand-iea-logo";
import { BrandNisalaIo } from "@/components/icons/brand-nisala-io-logo";
import { BrandSamtivLogo } from "@/components/icons/brand-samtiv-logo";
import { BrandSlavicaLogo } from "@/components/icons/brand-slavica-logo";
import { BrandUnicaLogo } from "@/components/icons/brand-unica-logo";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const brandLogos = [
  { Component: BrandNisalaIo, name: "Nisala IO" },
  { Component: BrandSamtivLogo, name: "Samtiv" },
  { Component: BrandIeaLogo, name: "IEA" },
  { Component: BrandSlavicaLogo, name: "Slavica" },
  { Component: BrandUnicaLogo, name: "Unica" },
  { Component: BrandBokingLogo, name: "Boking" },
];

export default async function HomeCover() {
  const t = await getTranslations("cover");
  return (
    <section
      id="home"
      className="md:h-dvh flex items-center justify-center hero-cover relative overflow-hidden"
    >
      <div className="min-h-[80vh] lg:min-h-[509px] py-24 lg:py-0 w-full flex items-center max-w-7xl px-4 mx-auto">
        <div className="flex flex-col gap-8 lg:gap-[54px] w-full lg:w-2/3">
          <div className="flex flex-col items-start gap-6 lg:gap-8">
            <h1 className="text-[2.7rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.36rem] leading-[1.1]">
              <span className="font-extrabold">NESSO DIGITALE</span>
              <br />
              <span className="font-light">LAB</span>
            </h1>
            <div className="hidden md:block w-full sm:w-3/4 lg:w-full h-px bg-gray-light" />
            <Button>
              <div className="font-bold leading-[0.9em]">
                {t("bookConsultation")}
              </div>
              <div className="size-6 flex items-center justify-center text-primary group-hover:text-white">
                <ArrowRight
                  size={12}
                  className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-1"
                />
              </div>
            </Button>
          </div>
          <div className="max-w-[360px] flex flex-col gap-6">
            <h2 className="text-[1.25rem] font-bold">
              {t("brandsTitle")}
            </h2>
            <div className="flex items-center flex-wrap gap-2.5">
              {brandLogos.map(({ Component, name }, index) => (
                <div
                  key={name}
                  className="circum-shown"
                  style={{ animationDelay: `${0.5 + index * 0.35}s` }}
                >
                  <Button variant="shade">
                    <Component />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute -bottom-[0%] left-[115%] sm:bottom-0 sm:left-[100%] lg:bottom-[5%] lg:left-[95%] xl:bottom-[8%] xl:left-[94%]
                        -translate-x-full
                        w-[250px] sm:w-[350px] md:w-[450px] lg:w-[599px]
                        opacity-80 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
        >
          <Image
            width={599}
            height={518}
            className="object-contain w-full h-auto circum-shown"
            alt=""
            src="/assets/circum.webp"
          />
        </div>
      </div>
    </section>
  );
}
