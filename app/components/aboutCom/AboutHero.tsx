"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import type { AboutHeroContent } from "@/app/types/about";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import BreadCrumb from "../ui/BreadCrumb";

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

const statsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

function CountUp({
  value,
  plain = false,
}: {
  value: number;
  plain?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.8,
  });

  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, reduce]);

  const rounded = Math.round(reduce ? value : display);

  return (
    <span ref={ref}>
      {plain
        ? String(rounded)
        : new Intl.NumberFormat("en-IN").format(rounded)}
    </span>
  );
}

export default function AboutHero({ data }: AboutHeroContent) {
  const {
    breadcrumb = [],
    eyebrow,
    titleStart,
    titleAccent,
    description,
    linkText,
    linkTo,
    image,
    stats = [],
  } = data;

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  const bannerRef = useRef<HTMLDivElement>(null);

  // Image parallax
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
    <section className="relative isolate w-full overflow-hidden bg-[#faf8f5] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#ece6da]">
      {/* FULL WIDTH BANNER - STANDARDIZED HEIGHT */}
      <motion.div
        ref={bannerRef}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative flex items-center overflow-hidden min-h-[740px] sm:min-h-[560px] lg:min-h-[650px]"
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
            className="absolute inset-0 -z-20 bg-gradient-to-br from-[#29382d] via-[#17221b] to-[#0a0a09]"
          />
        )}

        {/* IMAGE OVERLAYS */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/45"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-black/25"
        />

        {/* DECORATIVE LIGHT */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-[#a8c686]/10 blur-[150px]"
        />

        <MainContainer>
          <div className="relative z-10 flex w-full flex-col items-start justify-center py-10 text-left sm:py-12 lg:py-14">
            {/* BREADCRUMB - LEFT ALIGNED */}
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

            {/* HERO CONTENT - LEFT ALIGNED */}
            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="max-w-[850px] text-left"
            >
              {/* EYEBROW */}
              {eyebrow && (
                <motion.div variants={fadeUp} className="mb-3 sm:mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="dark" />
                </motion.div>
              )}

              {/* TITLE */}
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
                  className="mt-4 max-w-[620px] text-left"
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
      </motion.div>

      {/* STATS STRIP */}
      {stats.length > 0 && (
        <MainContainer>
          <motion.dl
            variants={statsVariants}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-20 -mt-10 grid grid-cols-2 overflow-hidden rounded-xs border border-[#ede7dc] bg-white text-[#141714] shadow-[0_12px_30px_-10px_rgba(20,24,20,0.08)] sm:-mt-12 lg:-mt-14 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`relative p-5 sm:p-7 ${
                  i !== 0 ? "border-l border-[#ede7dc]" : ""
                }`}
              >
                <dd className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-bold text-[#141714] sm:text-4xl">
                  {stat.prefix}
                  <CountUp value={stat.value} plain={Boolean(stat.prefix)} />
                  {stat.suffix}
                </dd>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#737a73]">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </MainContainer>
      )}
    </section>
  );
}
