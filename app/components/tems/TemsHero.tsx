
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

import type { TeamHero as TeamHeroType } from "@/app/types/team";
import MainContainer from "../ui/MainContainer";
import {  Eyebrow } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface TeamHeroProps {
  data: TeamHeroType;
}

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

const words: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
    },
  },
};

const word: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
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

function AnimatedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").filter(Boolean).map((item, index) => (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            variants={word}
            className="inline-block"
          >
            {item}
          </motion.span>
        </span>
      ))}
    </>
  );
}

function ScrollIndicator({
  text,
  target,
}: {
  text: string;
  target: string;
}) {
  return (
    <a
      href={target}
      aria-label={text}
      className="group relative flex h-28 w-28 shrink-0 items-center justify-center sm:h-32 sm:w-32"
    >
      {/* Rotating circular text */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <path
            id="team-circle-path"
            d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
          />
        </defs>

        <text
          fill="currentColor"
          fontSize="9"
          letterSpacing="3"
          className="fill-[#ece6da]/80 uppercase"
        >
          <textPath href="#team-circle-path">
            {`${text}  ·  ${text}  ·  `}
          </textPath>
        </text>
      </motion.svg>

      {/* Center circle */}
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-[#e0503a] group-hover:bg-[#e0503a] sm:h-14 sm:w-14">
        <ArrowDown
          size={20}
          className="transition-transform duration-300 group-hover:translate-y-1"
        />
      </span>
    </a>
  );
}

function TeamBackground({
  src,
  alt,
  reduce,
}: {
  src: string;
  alt?: string;
  reduce: boolean;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-45, 45]
  );

  return (
    <div
      ref={imageRef}
      className="absolute inset-0 overflow-hidden bg-[#171c17]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt || "WKX Foundation team working together"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Main overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Left dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Right dark gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent" /> */}

      {/* Bottom gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-black/10 to-black/20" /> */}
    </div>
  );
}

export default function TeamHero({
  data,
}: TeamHeroProps) {
  const {
    breadcrumb,
    eyebrow,
    titleStart,
    titleAccent,
    bannerImage,
  } = data;

  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion ?? false;

  return (
    <section
      id="team-hero"
      className="relative isolate min-h-[680px] w-full overflow-hidden bg-[#0a0a09] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#ece6da] sm:min-h-[720px] lg:min-h-[760px]"
    >
      {/* Full background image */}
      {bannerImage?.src && (
        <TeamBackground
          src={bannerImage.src}
          alt={bannerImage.alt}
          reduce={reduce}
        />
      )}

      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 z-[1] h-[450px] w-[450px] rounded-full bg-[#e0503a]/10 blur-[140px]"
      />

      <MainContainer>
        <div className="relative z-10 flex min-h-[680px] flex-col sm:min-h-[500px] lg:min-h-[550px]">

          {/* Top breadcrumb */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="pt-10 sm:pt-12 lg:pt-14"
          >
            <BreadCrumb breadcrumb={breadcrumb} />
          </motion.div>

          {/* Main content */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="flex flex-1 flex-col justify-center "
          >
            <div className="max-w-5xl">

              {/* Eyebrow */}
              {eyebrow && (
                <motion.div
                  variants={fadeUp}
                  className="mb-7 flex items-center gap-4"
                >

                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              {/* Heading */}
              <motion.h1
                variants={words}
                aria-label={`${titleStart} ${titleAccent}`}
                className="max-w-5xl font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(58px,8.5vw,90px)] font-medium leading-[0.91] tracking-[-0.045em] text-white"
              >
                <AnimatedWords text={titleStart} />

                <br />

                <em className="font-medium italic text-[#e0503a]">
                  <AnimatedWords text={titleAccent} />
                </em>
              </motion.h1>

             
            </div>
          </motion.div>

        </div>
      </MainContainer>
    </section>
  );
}
