"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

type Tone = "dark" | "light";

type StandaloneProp = { standalone?: boolean };

function useStandalone(standalone?: boolean) {
  const reduce = useReducedMotion();
  if (!standalone) return {};
  return {
    initial: reduce ? (false as const) : ("hidden" as const),
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.4 },
  };
}

/* ---------- Eyebrow ---------- */

interface EyebrowProps extends StandaloneProp {
  eyebrow: ReactNode;
  tone?: Tone;
}

export function Eyebrow({ eyebrow, tone = "light", standalone }: EyebrowProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#d6d9c9]" : "text-[#2a5c43]";
  const line = tone === "dark" ? "bg-[#a8c686]" : "bg-[#2a5c43]";

  return (
    <motion.p
      variants={fade}
      {...motionProps}
      className={`mb-3 sm:mb-4 flex items-center justify-start gap-3 text-left text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] ${color}`}
    >
      <motion.span variants={rule} className={`h-px w-8 origin-left ${line}`} aria-hidden="true" />
      <span>{eyebrow}</span>
    </motion.p>
  );
}

/* ---------- Words Helper ---------- */

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(" ")
        .filter(Boolean)
        .map((w, i) => (
          <span
            key={`${w}-${i}`}
            aria-hidden="true"
            className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-bottom"
          >
            <motion.span variants={word} className={`inline-block ${className}`}>
              {w}
            </motion.span>
          </span>
        ))}
    </>
  );
}

interface SectionTitleProps extends StandaloneProp {
  titleStart?: string;
  titleAccent?: string;
  titleEnd?: string;
  tone?: Tone;
  className?: string;
}

export function HeroTitle({
  titleStart = "",
  titleAccent = "",
  titleEnd = "",
  tone = "light",
  className = "",
  standalone,
}: SectionTitleProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#f0eadf]" : "text-[#141714]";

  return (
    <motion.h1
      variants={headline}
      {...motionProps}
      aria-label={[titleStart, titleAccent, titleEnd].filter(Boolean).join(" ")}
      className={`font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(38px,5vw,62px)] font-medium leading-[1.02] tracking-[-0.03em] text-left ${color} ${className}`}
    >
      <span className="block text-left">
        <Words text={titleStart} />
      </span>
      {titleAccent && (
        <span className="mt-1 block font-medium italic text-[#e0503a] text-left">
          <Words text={titleAccent} />
        </span>
      )}
      {titleEnd && (
        <span className="mt-1 block text-left">
          <Words text={titleEnd} />
        </span>
      )}
    </motion.h1>
  );
}

export function SectionTitle({
  titleStart = "",
  titleAccent = "",
  titleEnd = "",
  tone = "light",
  className = "",
  standalone,
}: SectionTitleProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#ece6da]" : "text-[#141714]";

  return (
    <motion.h2
      variants={headline}
      {...motionProps}
      aria-label={[titleStart, titleAccent, titleEnd].filter(Boolean).join(" ")}
      className={`font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(36px,5vw,58px)]
                  font-medium leading-[1.05] tracking-[-0.025em] text-left ${color} ${className}`}
    >
      <span className="text-left">
        <Words text={titleStart} />
      </span>
      {titleAccent && (
        <em className="font-medium italic text-[#e0503a]">
          {" "}
          <Words text={titleAccent} />
        </em>
      )}
      {titleEnd && <Words text={` ${titleEnd}`} />}
    </motion.h2>
  );
}

export function TitleAccent({ text }: { text: string }) {
  return (
    <span>
      <em className="italic text-[#e0503a]">{text}</em>
    </span>
  );
}

/* ---------- Description ---------- */

interface DescriptionProps extends StandaloneProp {
  description: ReactNode;
  variant?: "label" | "body";
  tone?: Tone;
}

export function Description({ description, variant = "label", tone = "light", standalone }: DescriptionProps) {
  const motionProps = useStandalone(standalone);

  if (variant === "body") {
    const color = tone === "dark" ? "text-[#d6d9c9]/90" : "text-[#4b524b]";
    return (
      <motion.p variants={fade} {...motionProps} className={`max-w-[34rem] text-left text-[14px] sm:text-[15px] leading-[1.85] ${color}`}>
        {description}
      </motion.p>
    );
  }

  const color = tone === "dark" ? "text-[#d6d9c9]" : "text-[#2a5c43]";

  return (
    <motion.p
      variants={fade}
      {...motionProps}
      className={`mb-6 flex items-center justify-start gap-4 text-left text-xs font-semibold uppercase leading-6 tracking-[0.18em] ${color}`}
    >
      {description}
    </motion.p>
  );
}
