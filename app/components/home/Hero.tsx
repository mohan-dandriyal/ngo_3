"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { HeroContent } from "@/app/types/home";
import { Description, Eyebrow } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import PrimaryButton from "../ui/PrimaryButton";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const copyContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function Hero({ data }: HeroContent) {
  const {
    eyebrow,
    titleLight,
    titleAccent,
    description,
    primaryBtn,
    secondaryBtn,
    images = [],
    slider,
  } = data;

  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const activeImage = images[activeIndex];
  const slideCount = images.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : 45]
  );

  const changeSlide = (direction: number) => {
    if (slideCount < 2) return;

    setActiveIndex((current) => {
      return (current + direction + slideCount) % slideCount;
    });
  };

  useEffect(() => {
    if (
      reduce ||
      !slider?.autoplay ||
      slideCount < 2
    ) {
      return;
    }

    const interval = Math.max(slider.interval ?? 5000, 1500);

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [reduce, slider?.autoplay, slider?.interval, slideCount]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0a09] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[400px] w-[400px] rounded-full bg-[#a8c686]/10 blur-[130px]"
      />

      <MainContainer>
        <div className="relative mx-auto grid items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14 lg:py-20">
          {/* LEFT: Hero content */}
          <motion.div
            variants={copyContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="relative z-10 order-2 lg:order-1"
          >
            {eyebrow && (
              <motion.div variants={rise} className="mb-6">
                <Eyebrow eyebrow={eyebrow} />
              </motion.div>
            )}

            <motion.h1 className="mb-6 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(48px,6.2vw,82px)] font-medium leading-[0.96] tracking-[-0.035em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease }}
                  className="block text-[#ece6da]"
                >
                  {titleLight}
                </motion.span>
              </span>

              {titleAccent && (
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.12, ease }}
                    className="block text-[#a8c686]"
                  >
                    {titleAccent}
                  </motion.span>
                </span>
              )}
            </motion.h1>

            <motion.div variants={rise} className="max-w-[490px]">
              <Description description={description} />
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              {primaryBtn?.text && (
                <PrimaryButton href={primaryBtn.linkTo}>
                  {primaryBtn.text}
                </PrimaryButton>
              )}
            </motion.div>

         
          </motion.div>

          {/* RIGHT: Image slider */}
          <motion.div
            style={{ y: imageY }}
            className="relative order-1 mx-auto w-full max-w-[560px] lg:order-2"
          >
            <div className="relative aspect-[4/4.7] w-full overflow-hidden bg-[#151915] ring-1 ring-white/10">
              <AnimatePresence mode="sync" initial={false}>
                {activeImage && !failedImages.includes(activeImage.src) ? (
                  <motion.div
                    key={activeImage.src}
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.8, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt || titleLight}
                      fill
                      priority={activeIndex === 0}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      onError={() =>
                        setFailedImages((current) =>
                          current.includes(activeImage.src)
                            ? current
                            : [...current, activeImage.src]
                        )
                      }
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="image-fallback"
                    className="absolute inset-0 bg-gradient-to-br from-[#29382d] to-[#0a0a09]"
                  />
                )}
              </AnimatePresence>

              {/* Image overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"
              />

              {/* Image label */}
              {activeImage?.badge && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage.badge}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-6 left-6 z-10 border-l-2 border-[#a8c686] pl-4"
                  >
                     {/* Slide counter */}
            {slideCount > 1 && (
              <div className="mt-12 flex items-center gap-4">
                <span className="font-mono text-sm text-[#a8c686]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-2">
                  {images && images.map((item: { src: string }, index: number) => (
                    <button
                      key={`${item.src}-${index}`}
                      type="button"
                      aria-label={`Show slide ${index + 1}`}
                      aria-pressed={activeIndex === index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-[3px] transition-all duration-300 ${
                        activeIndex === index
                          ? "w-10 bg-[#a8c686]"
                          : "w-5 bg-[#ece6da]/25 hover:bg-[#ece6da]/60"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-sm text-[#ece6da]/50">
                  {String(slideCount).padStart(2, "0")}
                </span>
              </div>
            )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Previous / next controls */}
              {slideCount > 1 && (
                <div className="absolute right-5 top-5 z-20 flex gap-2">
                  <button
                    type="button"
                    onClick={() => changeSlide(-1)}
                    aria-label="Previous image"
                    className="flex h-10 w-10 items-center justify-center border border-white/35 bg-black/25 text-lg text-white backdrop-blur-sm transition-colors hover:bg-[#a8c686] hover:text-[#0a0a09]"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() => changeSlide(1)}
                    aria-label="Next image"
                    className="flex h-10 w-10 items-center justify-center border border-white/35 bg-black/25 text-lg text-white backdrop-blur-sm transition-colors hover:bg-[#a8c686] hover:text-[#0a0a09]"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Decorative corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 -right-3 -z-0 h-24 w-24 border-b border-r border-[#a8c686]/50"
            />
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}
