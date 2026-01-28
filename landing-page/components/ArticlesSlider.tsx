"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ArticlesSliderProps {
  articles: Article[];
}

export default function ArticlesSlider({ articles }: ArticlesSliderProps) {
  return (
    <Swiper
      modules={[Keyboard, A11y]}
      spaceBetween={24}
      slidesPerView={1.3}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
      slidesOffsetBefore={16}
      slidesOffsetAfter={16}
      keyboard={{ enabled: true }}
      a11y={{
        enabled: true,
        prevSlideMessage: "Previous article",
        nextSlideMessage: "Next article",
      }}
      className="w-full"
    >
      {articles.map((article, index) => (
        <SwiperSlide key={index}>
          <a
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
