
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
import PrimaryButton from "../ui/PrimaryButton";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface CausesHeroProps {
  data: CausesHeroData;
  stats: HeroStat[];
}

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

const statsContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const statItem: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

export default function CausesHero({
  data,
  stats,
}: CausesHeroProps) {
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

  const bannerRef = useRef<HTMLElement>(null);

  // Background image parallax
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 85]
  );

  return (
    <section
      id="causes-hero"
      className="relative isolate w-full overflow-hidden
      bg-[#0a0a09] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]
      text-[#ece6da]"
    >
      {/* FULL WIDTH BANNER */}
      <div
        ref={bannerRef}
        className="relative flex min-h-[620px] items-center
        overflow-hidden sm:min-h-[700px]
        lg:min-h-[700px]"
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
            className="absolute inset-0 -z-20
            bg-gradient-to-br from-[#29382d] via-[#17221b] to-[#0a0a09]"
          />
        )}

        {/* IMAGE OVERLAY */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/70"
        />

        {/* DECORATIVE GLOW */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32
          top-1/4 -z-10 h-[420px] w-[420px] rounded-full
          bg-[#e0503a]/15 blur-[130px]"
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
          <div className="relative z-10 flex min-h-[620px]
          flex-col justify-between px-5 pb-24 pt-8
          sm:min-h-[700px] sm:px-8 sm:pb-28
          lg:min-h-[760px] lg:px-14 lg:pb-32 lg:pt-10">

            {/* BREADCRUMB */}
            {breadcrumb.length > 0 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-fit px-4 py-2 "
              >
                <BreadCrumb breadcrumb={breadcrumb} />
              </motion.div>
            )}

            {/* HERO CONTENT */}
            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-[950px] "
            >
              {/* EYEBROW */}
              {eyebrow && (
                <motion.div
                  variants={fadeUp}
                  className="mb-7"
                >
                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              {/* HEADING */}
              <motion.div variants={fadeUp}>
                <HeroTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                />
              </motion.div>

              {/* DESCRIPTION */}
              {description && (
                <motion.div
                  variants={fadeUp}
                  className="mt-7 max-w-[590px]"
                >
                  <Description
                    description={description}
                    variant="body"
                  />
                </motion.div>
              )}

              {/* CTA BUTTON */}
              {primaryButton?.text && (
                <motion.div
                  variants={fadeUp}
                  className="mt-9"
                >
                  <PrimaryButton
                    href={primaryButton.link || "#causes"}
                  >
                    {primaryButton.text}
                  </PrimaryButton>
                </motion.div>
              )}
            </motion.div>
          </div>
        </MainContainer>
      </div>
      <div className="h-16 sm:h-20" />
    </section>
  );
}
