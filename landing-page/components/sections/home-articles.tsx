import HeaderSection from "@/components/HeaderSection";
import ArticlesSlider from "@/components/ArticlesSlider";
import { getTranslations } from "next-intl/server";

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601 date string
  content: string | null;
}

interface Source {
  id: string | null;
  name: string;
}

async function getArticles(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.error("NEWS_API_KEY is not defined");
    return [];
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}&pageSize=3`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );

    if (!res.ok) {
      console.error("Failed to fetch articles:", res.statusText);
      return [];
    }

    const data: NewsAPIResponse = await res.json();
    return data.articles.slice(0, 6); // Return max 6 articles
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function HomeArticle() {
  const t = await getTranslations("articles");
  const articles = await getArticles();

  return (
    <section id="article" className="bg-white py-[60px] md:py-[120px]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10">
        <HeaderSection title={t("title")} description={t("description")} />
        {/*<div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                {article.urlToImage ? (
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="mt-4 ">
                <h3
                  className="font-semibold line-clamp-2 text-lg text-gray-900 group-hover:text-primary transition-colors"
                  aria-label={article.title}
                >
                  {article.title}
                </h3>
                {article.description && (
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {article.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>*/}
        <div className="-mx-4">
          <ArticlesSlider articles={articles} />
        </div>
      </div>
    </section>
  );
}
