
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
import { Description } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import BreadCrumb from "../ui/BreadCrumb";

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

const word: Variants = {
  hidden: {
    y: "110%",
  },
  show: {
    y: 0,
    transition: {
      duration: 1,
      ease,
    },
  },
};

const statsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

function Words({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").filter(Boolean).map((item, index) => (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          className="mr-[0.22em] inline-block overflow-hidden
          pb-[0.12em] pr-[0.04em] align-bottom"
        >
          <motion.span
            variants={word}
            className={`inline-block ${className}`}
          >
            {item}
          </motion.span>
        </span>
      ))}
    </>
  );
}

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
    if (reduce) {
      setDisplay(value);
      return;
    }

    if (!inView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, reduce]);

  const rounded = Math.round(display);

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

  const bannerRef = useRef<HTMLElement>(null);

  // Image parallax
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 90]
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden
      bg-[#0a0a09] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]
      text-[#ece6da]"
    >
      {/* FULL WIDTH BANNER */}
      <motion.div
        ref={bannerRef}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
        className="relative flex min-h-[620px] items-center
        overflow-hidden sm:min-h-[700px]
        lg:min-h-[780px]"
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
            className="absolute inset-0 -z-20
            bg-gradient-to-br from-[#29382d] via-[#17221b] to-[#0a0a09]"
          />
        )}

        {/* IMAGE OVERLAYS */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/35"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10
          bg-gradient-to-r from-black/85 via-black/55 to-black/15"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10
          bg-gradient-to-t from-[#0a0a09]/90 via-transparent to-black/30"
        />

        {/* DECORATIVE LIGHT */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40
          top-0 -z-10 h-[450px] w-[450px] rounded-full
          bg-[#a8c686]/10 blur-[150px]"
        />

        <MainContainer>
          <div className="relative z-10 flex min-h-[620px]
          flex-col justify-between px-5 pb-24 pt-8
          sm:min-h-[700px] sm:px-8 sm:pb-28
          lg:min-h-[700px] lg:px-14 lg:pb-32 lg:pt-10">

            {/* BREADCRUMB */}
            {breadcrumb.length > 0 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-fit rounded-sm
                 px-4 py-2"
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
                  className="mb-7 flex items-center gap-4"
                >
                  <span className="h-px w-10 bg-[#a8c686]" />

                  <span className="text-[10px] font-medium
                  uppercase tracking-[0.24em] text-[#d6d9c9]
                  sm:text-xs">
                    {eyebrow}
                  </span>
                </motion.div>
              )}

              {/* TITLE */}
              <motion.h1
                variants={container}
                aria-label={`${titleStart} ${titleAccent}`}
                className="max-w-[1000px]
                font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
                text-[clamp(54px,8.5vw,90px)] font-medium
                leading-[0.92] tracking-[-0.04em] text-[#f0eadf]"
              >
                <span className="block">
                  <Words text={titleStart} />
                </span>

                <span className="mt-1 block italic text-[#e0503a]">
                  <Words text={titleAccent} />
                </span>
              </motion.h1>

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

              {/* CTA */}
              {linkText && linkTo && (
                <motion.div
                  variants={fadeUp}
                  className="mt-9"
                >
                  <Link
                    href={linkTo}
                    className="group inline-flex min-h-[54px]
                    items-center gap-5 bg-[#e0503a] px-7 py-4
                    text-sm font-semibold text-white
                    transition-all duration-300 hover:bg-[#f06450]
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#e0503a]"
                  >
                    {linkText}

                    <span className="transition-transform
                    duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
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
            className="relative z-20 mx-4 -mt-12 grid
            grid-cols-2 overflow-hidden bg-[#e8e1d5]
            text-[#14110c] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]
            sm:mx-8 lg:mx-16 lg:-mt-16
            lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`flex flex-col justify-center px-5 py-7
                sm:px-7 sm:py-8 lg:px-8 lg:py-10
                ${index % 2 === 1 ? "border-l border-[#14110c]/15" : ""}
                ${index >= 2 ? "border-t border-[#14110c]/15 lg:border-t-0" : ""}
                lg:border-l lg:first:border-l-0`}
              >
                <dd className="m-0 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
                text-[clamp(36px,4.5vw,64px)] font-medium
                leading-none tracking-[-0.03em]">
                  {stat.prefix}
                  <CountUp
                    value={stat.value}
                    plain={stat.plain}
                  />
                  {stat.suffix && (
                    <span className="text-[#e0503a]">
                      {stat.suffix}
                    </span>
                  )}
                </dd>

                <dt className="mt-3 text-xs leading-snug
                text-[#5a544c] sm:text-sm">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </MainContainer>
      )}

      <div className="h-16 sm:h-20" />
    </section>
  );
}
