
"use client";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useRef } from "react";

interface SlideData {
  text: string;
}

interface SlideProps {
  text: string;
}

const Slide = ({ text }: SlideProps) => (
  <div className="shrink-0">
    <div className="text-sm text-gray-500 bg-muted px-4 py-2 rounded-lg whitespace-nowrap">
      {text}
    </div>
  </div>
);

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-full">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 bg-white dark:bg-neutral-800 rounded-full shadow p-1"
      >
        <IconArrowNarrowLeft className="text-neutral-600 dark:text-neutral-200" />
      </button>

      {/* Slide container */}
      <ul
        ref={scrollRef}
        className="flex overflow-x-auto overflow-hidden gap-3  px-10 py-2"
      >
        {slides.map((slide, index) => (
          <Slide key={index} text={slide.text} />
        ))}
      </ul>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 bg-white dark:bg-neutral-800 rounded-full shadow p-1"
      >
        <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
      </button>
    </div>
  );
}
