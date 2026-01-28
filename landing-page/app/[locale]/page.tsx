import HomeCover from "@/components/sections/home-cover";
import HomeProject from "@/components/sections/home-project";
import HomeDigital from "@/components/sections/home-digital";
import HomeService from "@/components/sections/home-service";
import HomeTeam from "@/components/sections/home-team";
import HomeArticle from "@/components/sections/home-articles";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  return (
    <main id="main-content">
      <HomeCover />
      <HomeTeam />
      <HomeService />
      <HomeProject />
      <HomeDigital />
      <HomeArticle />
    </main>
  );
}
