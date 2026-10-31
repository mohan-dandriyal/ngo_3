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
import { ArrowDown } from "lucide-react";

import type { ProgramsHeroData, ProgramItem } from "@/app/types/program";
import MainContainer from "../ui/MainContainer";
import {
  Description,
  Eyebrow,
  HeroTitle,
} from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface ProgramsHeroProps {
  data: ProgramsHeroData;
  programs: ProgramItem[];
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

export default function ProgramsHero({
  data,
}: ProgramsHeroProps) {
  const {
    breadcrumb,
    eyebrow,
    titleStart,
    titleAccent,
    description,
    image,
  } = data;

  const reduce = useReducedMotion();
  const bannerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-30, 30]
  );

  return (
    <section
      ref={bannerRef}
      id="programs-hero"
      className="relative w-full overflow-hidden text-[#ece6da]"
    >
      {/* Full image banner */}
      <div className="relative flex items-center overflow-hidden min-h-[740px] sm:min-h-[560px] lg:min-h-[650px]">
        {/* Background image */}
        {image?.src && (
          <motion.div
            className="absolute inset-0 -z-20"
            style={{ y: imageY }}
          >
            <Image
              src={image.src}
              alt={image.alt || ""}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        )}

        {/* Image overlays */}
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        {/* Banner content */}
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

            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-[850px] text-left"
            >
              {eyebrow && (
                <motion.div variants={fadeUp} className="mb-3 sm:mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="dark" />
                </motion.div>
              )}

              <motion.div variants={fadeUp}>
                <HeroTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  tone="dark"
                />
              </motion.div>

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
