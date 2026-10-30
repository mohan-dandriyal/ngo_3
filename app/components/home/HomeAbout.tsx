"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import MainContainer from "../ui/MainContainer";
import { Eyebrow } from "../ui/SectionContent";

type AboutImage = {
  src: string;
  alt: string;
  caption?: string;
};

type AboutStat = {
  value: string;
  label: string;
  description?: string;
};

type HomeAboutContent = {
  data: {
    eyebrow?: string;
    titleLight: string;
    titleAccent: string;
    description: string;
    image: AboutImage;
    linkText?: string;
    linkTo?: string;
    secondaryLinkText?: string;
    secondaryLinkTo?: string;
    stats?: AboutStat[];
    imageLabel?: string;
  };
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease,
    },
  },
};

export default function HomeAbout({ data }: HomeAboutContent) {
  const {
    eyebrow,
    titleLight,
    titleAccent,
    description,
    image,
    linkText,
    linkTo,
    secondaryLinkText,
    secondaryLinkTo,
    imageLabel,
  } = data;

  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#faf8f5] py-20 text-[#141714] sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/3 h-[420px] w-[420px] rounded-full bg-[#2a5c43]/[0.04] blur-[120px]"
      />

      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="relative"
        >
          {/* Main content */}
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* RIGHT: Foundation image */}
            <motion.div
              variants={imageReveal}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_16px_40px_-16px_rgba(20,24,20,0.1)] sm:aspect-[5/4.5] lg:aspect-[4/4.8]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Image label */}
                {imageLabel && (
                  <div className="absolute left-5 top-5 border border-white/30 bg-black/50 px-4 py-2 backdrop-blur-md sm:left-7 sm:top-7">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white">
                      {imageLabel}
                    </span>
                  </div>
                )}

                {/* Image caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                    <div className="mb-3 h-px w-10 bg-[#e0503a]" />
                    <p className="max-w-[360px] font-['Cormorant_Garamond',Georgia,serif] text-xl font-medium leading-snug text-white sm:text-2xl">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-28 w-28 border-b-2 border-r-2 border-[#2a5c43]/40"
              />
            </motion.div>

            {/* LEFT: Content */}
            <div className="order-2 lg:order-1">
              {eyebrow && (
                <motion.div variants={fadeUp} className="mb-6">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </motion.div>
              )}

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="max-w-[760px] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(40px,5vw,68px)] font-medium leading-[1.02] tracking-[-0.03em] text-[#141714]"
              >
                <span className="block text-[#141714]">
                  {titleLight}
                </span>
                <span className="mt-2 block italic text-[#e0503a]">
                  {titleAccent}
                </span>
              </motion.h2>

              {/* Accent line */}
              <motion.div
                variants={fadeUp}
                className="my-7 h-0.5 w-16 bg-[#e0503a]"
              />

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="max-w-[540px] text-[15px] leading-[1.9] text-[#484f48] sm:text-base sm:leading-[1.95]"
              >
                {description}
              </motion.p>

              {/* Mission note */}
              <motion.div
                variants={fadeUp}
                className="mt-7 flex items-start gap-3 rounded-r border-l-2 border-[#2a5c43] bg-[#2a5c43]/[0.04] p-4"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2a5c43]" />
                <p className="max-w-[440px] text-sm leading-relaxed text-[#414841]">
                  Lasting change begins when communities have the opportunity and support to shape their own future.
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                {linkText && (
                  <Link
                    href={linkTo || "/about"}
                    className="group inline-flex min-h-[50px] items-center justify-center gap-4 bg-[#e0503a] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#cb3d28] hover:shadow-[0_8px_24px_-6px_rgba(224,80,58,0.4)]"
                  >
                    {linkText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                )}

                {secondaryLinkText && (
                  <Link
                    href={secondaryLinkTo || "#programs"}
                    className="group inline-flex min-h-[50px] items-center gap-3 border border-[#141714]/20 bg-white px-6 py-3.5 text-sm font-medium text-[#141714] transition-all duration-300 hover:border-[#2a5c43] hover:text-[#2a5c43] hover:bg-[#2a5c43]/5"
                  >
                    {secondaryLinkText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}
