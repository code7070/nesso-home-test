import HeaderSection from "@/components/HeaderSection";
import HeaderStripe from "@/components/HeaderStripe";
import ServiceCard from "@/components/ServiceCard";
import { getTranslations } from "next-intl/server";

export default async function HomeService() {
  const t = await getTranslations("service");

  const services = [
    {
      title: t("items.customProjects.title"),
      description: t("items.customProjects.description"),
    },
    {
      title: t("items.teamOnDemand.title"),
      description: t("items.teamOnDemand.description"),
    },
  ];
  return (
    <section id="service" className="bg-white">
      <div className="max-w-7xl px-4 mx-auto py-[140px] flex flex-col gap-20">
        <HeaderSection
          title={t("title")}
          description={t("description")}
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {services.map((item, i) => (
            <ServiceCard key={`$item.title}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
