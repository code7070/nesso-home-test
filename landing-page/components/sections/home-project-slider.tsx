"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, EffectCards, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Button from "@/components/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

export default function HomeProjectSlider() {
  const [infoSwiper, setInfoSwiper] = useState<SwiperType | null>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      name: "Official App Milan",
      title: "AC Milan App",
      description:
        "An official mobile experience crafted to bring fans closer to the club through performance-driven design and intuitive interaction.",
      image: "/projects/milan.jpg",
    },
    {
      name: "E-Commerce Platform",
      title: "Luxury Fashion Store",
      description:
        "A premium shopping experience with seamless checkout and personalized recommendations.",
      image: "/projects/fashion.jpg",
    },
    {
      name: "Fintech Dashboard",
      title: "Banking Analytics",
      description:
        "Real-time financial insights with interactive charts and predictive analytics.",
      image: "/projects/fintech.jpg",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-x-hidden md:overflow-x-auto">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column: Info & Navigation */}
        <div className="order-2 md:order-1 space-y-4 md:space-y-8">
          <Swiper
            modules={[Controller, Keyboard, A11y]}
            onSwiper={setInfoSwiper}
            controller={{ control: imageSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            spaceBetween={50}
            slidesPerView={1}
            allowTouchMove={false}
            keyboard={{ enabled: true }}
            a11y={{
              enabled: true,
              prevSlideMessage: "Previous project",
              nextSlideMessage: "Next project",
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="space-y-6">
                  <h3 className="text-center md:text-left text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-center md:text-left text-lg text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Project Name & Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <span className="bg-gray-lighter text-gray rounded-full py-2 px-4 text-sm">
              {projects[activeIndex].name}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="circle-nav"
                onClick={() => infoSwiper?.slidePrev()}
                disabled={activeIndex === 0}
                aria-label="Previous project"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>

              <Button
                variant="circle-nav"
                onClick={() => infoSwiper?.slideNext()}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Image Slider with Card Effect */}
        <div className="order-1 md:order-2 px-8 relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
          <style jsx global>{`
            .project-image-slider .swiper-slide {
              opacity: 0.4;
            }
            .project-image-slider .swiper-slide-active {
              opacity: 1;
            }
          `}</style>
          <Swiper
            modules={[Controller, EffectCards, Keyboard, A11y]}
            onSwiper={setImageSwiper}
            controller={{ control: infoSwiper }}
            effect="cards"
            grabCursor={true}
            cardsEffect={{
              slideShadows: true,
              perSlideOffset: 8,
              perSlideRotate: 2,
            }}
            keyboard={{ enabled: true }}
            a11y={{
              enabled: true,
              prevSlideMessage: "Previous project",
              nextSlideMessage: "Next project",
            }}
            className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] h-[350px] sm:h-[420px] lg:h-[500px] project-image-slider"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm sm:text-base lg:text-xl">
                  {project.image}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
