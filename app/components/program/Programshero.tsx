
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
import { ArrowDown, ArrowDownRight } from "lucide-react";

import type {
  ProgramItem,
  ProgramsHeroData,
} from "@/app/types/program";

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
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1, ease },
  },
};

export default function ProgramsHero({
  data,
  programs = [],
}: ProgramsHeroProps) {
  const reduce = useReducedMotion();

  const {
    eyebrow,
    breadcrumb,
    titleStart,
    titleAccent,
    description,
    indexLabel,
    image,
  } = data;

  const bannerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-45, 45]
  );

  return (
    <section
      ref={bannerRef}
      id="programs-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] text-[#ece6da]"
    >
      {/* Full image banner */}
      <div className="relative min-h-[680px] overflow-hidden lg:min-h-[760px]">

        {/* Background image */}
        {image?.src && (
          <motion.div
            className="absolute inset-0"
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
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080b09]/85 via-[#080b09]/70 to-[#080b09]/15" />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-transparent to-black/20" /> */}

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        {/* Banner content */}
        <MainContainer>
          <div className="relative z-10 flex min-h-[680px] flex-col justify-between py-10 lg:min-h-[760px] lg:py-14">

            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-4xl pt-8 lg:pt-14"
            >
              <motion.div variants={fadeUp}>
                <BreadCrumb breadcrumb={breadcrumb} />
              </motion.div>

              {eyebrow && (
                <motion.div variants={fadeUp} className="mt-10">
                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="mt-8">
                <HeroTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                />
              </motion.div>

              {description && (
                <motion.div
                  variants={fadeUp}
                  className="mt-7 max-w-2xl"
                >
                  <Description
                    description={description}
                    variant="body"
                  />
                </motion.div>
              )}

              <motion.a
                variants={fadeUp}
                href="#programs"
                className="group mt-10 inline-flex items-center gap-4 border border-[#e8c99a]/50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#ece6da] transition-all duration-300 hover:border-[#e8c99a] hover:bg-[#e8c99a] hover:text-[#0a0a09]"
              >
                <span>Explore our programs</span>
                <ArrowDown
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </motion.a>
            </motion.div>

          </div>
        </MainContainer>
      </div>

    </section>
  );
}
