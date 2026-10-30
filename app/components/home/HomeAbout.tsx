
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

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

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
    scale: 1.06,
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

export default function HomeAbout({
  data,
}: HomeAboutContent) {
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
    stats = [],
    imageLabel,
  } = data;

  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0a0a09] py-18 text-[#ece6da] sm:py-20 lg:py-22"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/3 h-[400px] w-[400px] rounded-full bg-[#a8c686]/[0.06] blur-[130px]"
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
              <div className="relative aspect-[4/4.5] overflow-hidden bg-[#171b16] sm:aspect-[5/4.5] lg:aspect-[4/4.8]">

                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
                />

                {/* Image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                {/* Image label */}
                {imageLabel && (
                  <div className="absolute left-5 top-5 border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md sm:left-7 sm:top-7">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#ece6da]">
                      {imageLabel}
                    </span>
                  </div>
                )}

                {/* Image caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                    <div className="mb-3 h-px w-10 bg-[#e0503a]" />

                    <p className="max-w-[350px] font-['Cormorant_Garamond',Georgia,serif] text-xl leading-snug text-white sm:text-2xl">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-28 w-28 border-b border-r border-[#a8c686]/50"
              />
            </motion.div>

            {/* LEFT: Content */}
            <div className="order-2 lg:order-1">

              {eyebrow && (
                <motion.div
                  variants={fadeUp}
                  className="mb-7"
                >
                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="max-w-[760px] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(42px,5.5vw,76px)] font-medium leading-[0.99] tracking-[-0.035em]"
              >
                <span className="block text-[#ece6da]">
                  {titleLight}
                </span>

                <span className="mt-2 block italic text-[#e0503a]">
                  {titleAccent}
                </span>
              </motion.h2>

              {/* Accent line */}
              <motion.div
                variants={fadeUp}
                className="my-8 h-px w-16 bg-[#e0503a]"
              />

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="max-w-[520px] text-[15px] leading-[1.95] text-[#bdb7aa] sm:text-base sm:leading-[2]"
              >
                {description}
              </motion.p>

              {/* Mission note */}
              <motion.div
                variants={fadeUp}
                className="mt-7 flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#a8c686]" />

                <p className="max-w-[420px] text-sm leading-7 text-[#8f9288]">
                  Lasting change begins when communities have
                  the opportunity and support to shape their
                  own future.
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                {linkText && (
                  <Link
                    href={linkTo || "/about"}
                    className="group inline-flex min-h-[50px] items-center justify-center gap-4 bg-[#e0503a] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#f06450]"
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
                    className="group inline-flex min-h-[50px] items-center gap-3 border border-white/20 px-6 py-3 text-sm text-[#ece6da] transition-all duration-300 hover:border-[#a8c686] hover:text-[#a8c686]"
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
