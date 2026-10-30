
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

import type { ContactHero as ContactHeroType } from "@/app/types/contact";
import MainContainer from "../ui/MainContainer";
import {
  Description,
  Eyebrow,
} from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface ContactHeroProps {
  data: ContactHeroType;
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

/* Circular animated scroll cue */
function ScrollCue({
  text,
  href,
  reduce,
}: {
  text: string;
  href: string;
  reduce: boolean | null;
}) {
  const repeats = Math.max(1, Math.round(30 / (text.length + 3)));
  const ring = Array.from({ length: repeats })
    .map(() => `${text} • `)
    .join("");

  return (
    <motion.a
      variants={fadeUp}
      href={href}
      aria-label={text}
      className="group relative inline-grid h-32 w-32 place-items-center rounded-full outline-none sm:h-36 sm:w-36 focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
    >
      <motion.svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <defs>
          <path
            id="contact-hero-circle"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>

        <text
          className="fill-[#ece6da] transition-colors duration-300 group-hover:fill-[#e0503a]"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <textPath
            href="#contact-hero-circle"
            textLength={286}
            lengthAdjust="spacing"
          >
            {ring}
          </textPath>
        </text>
      </motion.svg>

      <span className="relative grid h-14 w-14 place-items-center rounded-full border border-[#ece6da]/50 text-[#ece6da] transition-all duration-300 group-hover:border-[#e0503a] group-hover:bg-[#e0503a] group-hover:text-[#14110c]">
        <ArrowDown
          size={22}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-y-1"
        />
      </span>
    </motion.a>
  );
}

export default function ContactHero({ data }: ContactHeroProps) {
  const reduce = useReducedMotion();

  const {
    breadcrumb,
    eyebrow,
    titleStart,
    titleAccent,
    description,
    image,
    imageCaption,
    scrollText,
    scrollTarget = "#contact",
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
      id="contact-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] text-[#ece6da]"
    >
      {/* Full-width banner */}
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

        {/* Dark image overlays */}
        <div className="absolute inset-0 bg-black/70" />

        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#080b09]/95 via-[#080b09]/75 to-[#080b09]/25" /> */}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-transparent to-black/20" /> */}

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        <MainContainer>
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="relative z-10 flex min-h-[680px] flex-col justify-between py-10 lg:min-h-[760px] lg:py-14"
          >
            {/* Banner content */}
            <div className="max-w-5xl pt-8 lg:pt-14">

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
                className="mt-8 max-w-5xl font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(54px,8.5vw,108px)] font-medium leading-[0.98] tracking-[-0.03em] text-[#ece6da]"
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
                  className="mt-8 max-w-2xl"
                >
                  <Description
                    description={description}
                    variant="body"
                  />
                </motion.div>
              )}

              {scrollText && (
                <div className="mt-10">
                  <ScrollCue
                    text={scrollText}
                    href={scrollTarget}
                    reduce={reduce}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </MainContainer>
      </div>
    </section>
  );
}
