import HeaderSection from "@/components/HeaderSection";
import { getTranslations } from "next-intl/server";
import HomeProjectSlider from "./home-project-slider";

export default async function HomeProject() {
  const t = await getTranslations("project");

  return (
    <section id="project" className="bg-gray-lightest py-11">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8 md:gap-16">
        <HeaderSection
          title={t("title")}
          description={t("description")}
        />
        <HomeProjectSlider />
      </div>
    </section>
  );
}
