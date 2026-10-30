"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import type { TeamHero as TeamHeroType } from "@/app/types/team";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface TeamHeroProps {
  data: TeamHeroType;
}

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

function TeamBackground({
  src,
  alt,
  reduce,
}: {
  src: string;
  alt?: string;
  reduce: boolean;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-30, 30]
  );

  return (
    <div
      ref={imageRef}
      className="absolute inset-0 overflow-hidden bg-[#171c17]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt || "WKX Foundation team working together"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Main overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
    </div>
  );
}

export default function TeamHero({
  data,
}: TeamHeroProps) {
  const {
    breadcrumb,
    eyebrow,
    titleStart,
    titleAccent,
    description,
    bannerImage,
  } = data;

  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion ?? false;

  return (
    <section
      id="team-hero"
      className="relative isolate w-full overflow-hidden bg-[#faf8f5] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#ece6da]"
    >
      {/* Full-width banner - STANDARDIZED HEIGHT */}
      <div className="relative flex items-center overflow-hidden sm:min-h-[560px] sm:min-h-[560px] lg:min-h-[650px]">
        {/* Full background image */}
        {bannerImage?.src && (
          <TeamBackground
            src={bannerImage.src}
            alt={bannerImage.alt}
            reduce={reduce}
          />
        )}

        {/* Ambient accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 z-[1] h-[450px] w-[450px] rounded-full bg-[#e0503a]/10 blur-[140px]"
        />

        <MainContainer>
          <div className="relative z-10 flex w-full flex-col items-start justify-center py-10 text-left sm:py-12 lg:py-14">
            {breadcrumb && (
              <motion.div
                variants={fadeUp}
                initial={reduce ? false : "hidden"}
                animate="show"
                className="w-full text-left"
              >
                <BreadCrumb breadcrumb={breadcrumb} className="mb-3 sm:mb-4 text-left" />
              </motion.div>
            )}

            {/* Main content - LEFT ALIGNED */}
            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-[850px] text-left"
            >
              {/* Eyebrow */}
              {eyebrow && (
                <motion.div
                  variants={fadeUp}
                  className="mb-3 sm:mb-4"
                >
                  <Eyebrow eyebrow={eyebrow} tone="dark" />
                </motion.div>
              )}

              {/* Heading */}
              <motion.div variants={fadeUp}>
                <HeroTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  tone="dark"
                />
              </motion.div>

              {/* Description */}
              {description && (
                <motion.div
                  variants={fadeUp}
                  className="mt-4 max-w-2xl text-left"
                >
                  <Description
                    description={description}
                    variant="body"
                    tone="dark"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </MainContainer>
      </div>
    </section>
  );
}
