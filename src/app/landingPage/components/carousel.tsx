// "use client";
// import { IconArrowNarrowRight } from "@tabler/icons-react";
// import { useState, useRef, useId, useEffect } from "react";

// interface SlideData {
//   text:string
// }

// interface SlideProps {
//   text: string
// }

// const Slide = ({ text}: SlideProps) => {

//   return (
//     <div className="">
//       <div className="text-xs bg-muted p-2 rounded-lg ">
//         {text}
//       </div>
//     </div>
//   );
// };

// interface CarouselControlProps {
//   type: string;
//   title: string;
//   handleClick: () => void;
// }

// const CarouselControl = ({
//   type,
//   title,
//   handleClick,
// }: CarouselControlProps) => {
//   return (
//     <button
//       className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 
        
//       `}
//       title={title}
//       onClick={handleClick}
//     >
//       <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
//     </button>
//   );
// };

// interface CarouselProps {
//   slides: SlideData[];
// }

// export default function Carousel({ slides }: CarouselProps) {
//   const [current, setCurrent] = useState(0);

//   const handlePreviousClick = () => {
//     const previous = current - 1;
//     setCurrent(previous < 0 ? slides.length - 1 : previous);
//   };

//   const handleNextClick = () => {
//     const next = current + 1;
//     setCurrent(next === slides.length ? 0 : next);
//   };

//   const handleSlideClick = (index: number) => {
//     if (current !== index) {
//       setCurrent(index);
//     }
//   };

//   const id = useId();

//   return (
//     <div
//       className="relative  mx-auto"
//       aria-labelledby={`carousel-heading-${id}`}
//     >
//       <ul
//         className="absolute flex mx-[-4vmin] gap-2  transition-transform duration-1000 ease-in-out"
//         style={{
//           transform: `translateX(-${current * (100 / slides.length)}%)`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <Slide
//             key={index}
//             text={slide.text}
//           />
//         ))}
//       </ul>

//       <div className="absolute mt-10 flex justify-center w-full top-[calc(100%+1rem)]">
//         <CarouselControl
//           type="previous"
//           title="Go to previous slide"
//           handleClick={handlePreviousClick}
//         />

//         <CarouselControl
//           type="next"
//           title="Go to next slide"
//           handleClick={handleNextClick}
//         />
//       </div>
//     </div>
//   );
// }



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
