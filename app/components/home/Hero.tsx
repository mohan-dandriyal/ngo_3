
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import type { HeroContent } from "@/app/types/home";
import MainContainer from "../ui/MainContainer";

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export default function Hero({ data }: HeroContent) {
  const { slider } = data;
  const slides = (data.images && data.images.length > 0 ? data.images : []).map((image: any, index: number) => ({
    ...image,
    id: (image as any).id || `hero-${index}`,
    eyebrow: (image as any).eyebrow || data.eyebrow,
    titleLight: (image as any).titleLight || data.titleLight,
    titleAccent: (image as any).titleAccent || data.titleAccent,
    description: (image as any).description || data.description,
    primaryBtn: (image as any).primaryBtn || data.primaryBtn,
    donateBtn: (image as any).donateBtn || data.secondaryBtn,
  }));

  const reduce = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const sectionRef = useRef<HTMLElement>(null);

  const slideCount = slides.length;
  const currentIndex = slideCount > 0 ? activeIndex % slideCount : 0;
  const activeSlide = slides[currentIndex];

  const changeSlide = (direction: number) => {
    if (slideCount < 2) return;

    setActiveIndex((current) => {
      return (current % slideCount + direction + slideCount) % slideCount;
    });
  };

  // Autoplay
  useEffect(() => {
    if (
      reduce ||
      !slider?.autoplay ||
      slideCount < 2 ||
      isPaused
    ) {
      return;
    }

    const interval = Math.max(slider.interval || 7000, 3000);

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current % slideCount + 1) % slideCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [
    reduce,
    slider?.autoplay,
    slider?.interval,
    slideCount,
    isPaused,
  ]);

  if (!activeSlide) return null;

  const imageFailed = failedImages.includes(activeSlide.src);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="WKX Foundation highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setIsPaused(false);
        }
      }}
      className="relative isolate min-h-[740px] w-full overflow-hidden
      bg-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]
      text-[#ece6da] sm:min-h-[600px] lg:min-h-[780px]"
    >
      {/* BACKGROUND IMAGE */}
      <AnimatePresence initial={false}>
        {!imageFailed && (
          <motion.div
            key={activeSlide.id}
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduce ? 0 : 1.2,
              ease,
            }}
            className="absolute inset-0 -z-20"
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              onError={() => {
                setFailedImages((current) =>
                  current.includes(activeSlide.src)
                    ? current
                    : [...current, activeSlide.src]
                );
              }}
              className="object-cover object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>



      {/* GRADIENT OVERLAYS */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10
        bg-gradient-to-r from-black/85 via-black/55 to-black/10"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10
        bg-gradient-to-t from-black/60 via-transparent to-black/20"
      />

      {/* DECORATIVE LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 -z-10
        h-[500px] w-[500px] rounded-full bg-[#a8c686]/10 blur-[150px]"
      />

      <MainContainer>
        <div className="relative flex min-h-[540px] w-full flex-col justify-center text-left py-20 pb-32 sm:min-h-[580px] sm:py-24 sm:pb-36 lg:min-h-[640px] lg:py-28 lg:pb-40">



          {/* SLIDE CONTENT */}
          <div className="relative pt-10 z-10 max-w-[850px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.id}
                variants={contentVariants}
                initial={reduce ? false : "hidden"}
                animate="show"
                exit={reduce ? undefined : "exit"}
              >
                {/* EYEBROW */}
                {activeSlide.eyebrow && (
                  <motion.div
                    variants={itemVariants}
                    className="mb-7 flex items-center gap-4"
                  >
                    <span className="h-px w-10 bg-[#a8c686]" />

                    <p className="text-[10px] font-medium uppercase
                    tracking-[0.24em] text-[#d6d9c9] sm:text-xs">
                      {activeSlide.eyebrow}
                    </p>
                  </motion.div>
                )}

                {/* HEADING */}
                <motion.h1
                  variants={itemVariants}
                  className="max-w-[850px]
                  font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
                  text-[clamp(44px,6.2vw,74px)] font-medium
                  leading-[0.91] tracking-[-0.045em]"
                >
                  <span className="block text-[#f0eadf]">
                    {activeSlide.titleLight}
                  </span>

                  <span className="mt-1 block italic text-[#e0503a]">
                    {activeSlide.titleAccent}
                  </span>
                </motion.h1>

                {/* DESCRIPTION */}
                {activeSlide.description && (
                  <motion.p
                    variants={itemVariants}
                    className="mt-7 max-w-[570px] text-sm
                    leading-[1.9] text-[#e1ded5] sm:text-base
                    sm:leading-[2]"
                  >
                    {activeSlide.description}
                  </motion.p>
                )}

                {/* BUTTONS */}
                <motion.div
                  variants={itemVariants}
                  className="mt-9 flex flex-wrap items-center gap-4"
                >
                  {activeSlide.donateBtn && (
                    <Link
                      href={activeSlide.donateBtn.linkTo}
                      className="group inline-flex min-h-[54px] items-center
                      justify-center gap-5 bg-[#e0503a] px-7 py-4
                      text-sm font-semibold text-white
                      transition-colors duration-300 hover:bg-[#f06450]
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#e0503a]"
                    >
                      {activeSlide.donateBtn.text}

                      <span className="transition-transform duration-300
                      group-hover:translate-x-1">
                        ↗
                      </span>
                    </Link>
                  )}

                  {activeSlide.primaryBtn && (
                    <Link
                      href={activeSlide.primaryBtn.linkTo}
                      className="group inline-flex min-h-[54px] items-center
                      justify-center gap-4 border border-white/40
                      bg-white/[0.04] px-7 py-4 text-sm font-medium
                      text-white backdrop-blur-sm transition-all
                      duration-300 hover:border-[#a8c686]
                      hover:bg-[#a8c686]/15 hover:text-[#c6dda9]
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#a8c686]"
                    >
                      {activeSlide.primaryBtn.text}

                      <span className="transition-transform duration-300
                      group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SLIDER CONTROLS */}
          {slideCount > 1 && (
            <div className="absolute bottom-6 left-0 right-0 z-20 flex items-end justify-between gap-5 sm:bottom-8 lg:bottom-10">



              {/* SLIDE NUMBER AND PROGRESS */}
              <div className="flex min-w-0 flex-1 items-center gap-5">
                <div className="flex shrink-0 items-center gap-2 font-mono">
                  <span className="text-xl text-[#a8c686]">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-white/50">
                    / {String(slideCount).padStart(2, "0")}
                  </span>
                </div>

                {/* PAGINATION */}
                <div className="flex max-w-[240px] flex-1 items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Slide ${index + 1}`}
                      aria-current={currentIndex === index ? "true" : undefined}
                      className="group flex h-8 flex-1 items-center
                      outline-none focus-visible:ring-2
                      focus-visible:ring-[#a8c686]"
                    >
                      <span
                        className={`h-[3px] w-full rounded-full
                        transition-all duration-500 ${currentIndex === index
                            ? "bg-[#a8c686]"
                            : "bg-white/40 group-hover:bg-white/80"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* PREVIOUS / NEXT */}
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Previous slide"
                  className="grid h-11 w-11 place-items-center
                  border border-white/35 bg-black/20 text-xl text-white
                  backdrop-blur-sm transition-all duration-300
                  hover:border-[#a8c686] hover:bg-[#a8c686]
                  hover:text-[#0a0a09] focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-[#a8c686]"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Next slide"
                  className="grid h-11 w-11 place-items-center
                  border border-white/35 bg-black/20 text-xl text-white
                  backdrop-blur-sm transition-all duration-300
                  hover:border-[#a8c686] hover:bg-[#a8c686]
                  hover:text-[#0a0a09] focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-[#a8c686]"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
