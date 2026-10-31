"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import type { CausesHeroData, HeroStat } from "@/app/types/cause";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface CausesHeroProps {
  data: CausesHeroData;
  stats: HeroStat[];
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

export default function CausesHero({ data }: CausesHeroProps) {
  const {
    eyebrow,
    breadcrumb = [],
    titleStart,
    titleAccent,
    description,
    primaryButton,
    image,
  } = data;

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  const bannerRef = useRef<HTMLDivElement>(null);

  // Background image parallax
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 60]
  );

  return (
    <section
      id="causes-hero"
      className="relative isolate w-full overflow-hidden bg-[#faf8f5] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#ece6da]"
    >
      {/* FULL WIDTH BANNER */}
      <div
        ref={bannerRef}
        className="relative flex items-center overflow-hidden min-h-[740px] sm:min-h-[560px] lg:min-h-[650px] "
      >
        {/* BACKGROUND IMAGE */}
        {!imgFailed && image?.src ? (
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 -z-20"
          >
            <Image
              src={image.src}
              alt={image.alt || ""}
              fill
              priority
              sizes="100vw"
              onError={() => setImgFailed(true)}
              className="object-cover object-center"
            />
          </motion.div>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-gradient-to-br from-[#29382d] via-[#17221b] to-[#0a0a09]"
          />
        )}

        {/* IMAGE OVERLAY */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/55"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
        />

        {/* DECORATIVE GLOW */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-[#e0503a]/15 blur-[130px]"
          animate={
            reduce
              ? undefined
              : { opacity: [0.35, 0.75, 0.35] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <MainContainer>
          <div className="relative z-10 flex w-full flex-col items-start justify-center py-10 text-left sm:py-12 lg:py-14">
            {/* BREADCRUMB */}
            {breadcrumb.length > 0 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full text-left"
              >
                <BreadCrumb breadcrumb={breadcrumb} className="mb-3 sm:mb-4 text-left" />
              </motion.div>
            )}

            {/* HERO CONTENT */}
            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-[850px] text-left"
            >
              {/* EYEBROW */}
              {eyebrow && (
                <motion.div
                  variants={fadeUp}
                  className="mb-3 sm:mb-4"
                >
                  <Eyebrow eyebrow={eyebrow} tone="dark" />
                </motion.div>
              )}

              {/* HEADING */}
              <motion.div variants={fadeUp}>
                <HeroTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  tone="dark"
                />
              </motion.div>

              {/* DESCRIPTION */}
              {description && (
                <motion.div
                  variants={fadeUp}
                  className="mt-4 max-w-[620px]"
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
