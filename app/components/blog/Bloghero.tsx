
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import type { BlogHeroData, BlogPost } from "@/app/types/blog";

import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface BlogHeroProps {
  data: BlogHeroData;
  latest?: BlogPost;
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
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const headline: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 1.1, ease },
  },
};

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").filter(Boolean).map((item, index) => (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {item}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function BlogHero({ data, latest }: BlogHeroProps) {
  const reduce = useReducedMotion();

  const {
    eyebrow,
    breadcrumb,
    titleStart,
    titleAccent,
    description,
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
    reduce ? [0, 0] : [-40, 40]
  );

  return (
    <section
      ref={bannerRef}
      id="blog-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] text-[#ece6da]"
    >
      {/* Full-width banner */}
      <div className="relative min-h-[700px] overflow-hidden lg:min-h-[780px]">

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

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/70" />

        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#080b09]/95 via-[#080b09]/75 to-[#080b09]/30" /> */}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-transparent to-black/60" /> */}

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        <MainContainer>
          <div className="relative z-10 flex min-h-[600px] flex-col justify-between py-10 lg:min-h-[70px] lg:py-14">

            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              className="grid flex-1 items-center gap-12 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20"
            >
              {/* Left content */}
              <div className="max-w-3xl">
                {breadcrumb && (
                  <motion.div variants={fadeUp}>
                    <BreadCrumb breadcrumb={breadcrumb} />
                  </motion.div>
                )}

                {eyebrow && (
                  <motion.div variants={fadeUp} className="mt-10">
                    <Eyebrow eyebrow={eyebrow} />
                  </motion.div>
                )}

                <motion.h1
                  variants={headline}
                  aria-label={`${titleStart} ${titleAccent}`}
                  className="mt-8 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(54px,8vw,90px)] font-medium leading-[0.98] tracking-[-0.03em] text-[#ece6da]"
                >
                  <Words text={titleStart} />
                  <br />
                  <em className="font-medium italic text-[#e0503a]">
                    <Words text={titleAccent} />
                  </em>
                </motion.h1>

                {description && (
                  <motion.div
                    variants={fadeUp}
                    className="mt-8 max-w-xl"
                  >
                    <Description
                      description={description}
                      variant="body"
                    />
                  </motion.div>
                )}
              </div>

           
            </motion.div>
          </div>
        </MainContainer>
      </div>
    </section>
  );
}
