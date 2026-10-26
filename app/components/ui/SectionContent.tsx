"use client"

import React, { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/*
  How the animation works
  -----------------------
  Every component uses the variant names "hidden" and "show".
  - Inside a motion parent that sets initial="hidden" and animate/whileInView="show",
    they join the parent's stagger automatically (this is how Hero and the other sections use them).
  - Used on their own, add the `standalone` prop and they animate themselves when scrolled into view.
  - With no motion parent and no `standalone`, they simply render with no animation.
*/

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

type Tone = "dark" | "light"; // dark = dark background section, light = sand background section

type StandaloneProp = { standalone?: boolean };

/* Props that make a component animate by itself when it scrolls into view */
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

export function Eyebrow({ eyebrow, tone = "dark", standalone }: EyebrowProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#e9a26b]" : "text-[#3f6b57]";
  const line = tone === "dark" ? "bg-[#e9a26b]" : "bg-[#3f6b57]";

  return (
    <motion.p
      variants={fade}
      {...motionProps}
      className={`mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] ${color}`}
    >
      {/* The rule draws from left to right */}
      <motion.span variants={rule} className={`h-px w-9 origin-left ${line}`} aria-hidden="true" />
      {eyebrow}
    </motion.p>
  );
}

/* ---------- Section title ---------- */

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
  tone = "dark",
  className = "",
  standalone,
}: SectionTitleProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#ece6da]" : "text-[#14110c]";

  return (
    <motion.h2
      variants={headline}
      {...motionProps}
      aria-label={[titleStart, titleAccent, titleEnd].filter(Boolean).join(" ")}
      className={`font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(56px,8.6vw,100px)] font-medium leading-[0.98] tracking-[-0.02em]  ${color} ${className}`}
    >
      <Words text={titleStart} />
      {titleAccent && (
        <em className="font-medium italic text-[#e0503a]">
          <Words text={titleAccent} />
        </em>
      )}
      <Words text={titleEnd} />
    </motion.h2>
  );
}

export function SectionTitle({
  titleStart = "",
  titleAccent = "",
  titleEnd = "",
  tone = "dark",
  className = "",
  standalone,
}: SectionTitleProps) {
  const motionProps = useStandalone(standalone);
  const color = tone === "dark" ? "text-[#ece6da]" : "text-[#14110c]";

  return (
    <motion.h2
      variants={headline}
      {...motionProps}
      aria-label={[titleStart, titleAccent, titleEnd].filter(Boolean).join(" ")}
      className={`font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(44px,6.4vw,96px)]
                  font-medium leading-none tracking-[-0.02em] ${color} ${className}`}
    >
      <Words text={titleStart} />
      {titleAccent && (
        <em className="font-medium italic text-[#e0503a]">
          <Words text={titleAccent} />
        </em>
      )}
      <Words text={titleEnd} />
    </motion.h2>
  );
}

/* Accent-coloured italic text for use inside your own headings */
export function SectionTitleDarkText({ text }: { text: ReactNode }) {
  return (
    <span>
      <em className="italic text-[#e0503a]">{text}</em>
    </span>
  );
}

/* ---------- Description ---------- */

interface DescriptionProps extends StandaloneProp {
  description: ReactNode;
  /** "label" keeps your original small uppercase look; "body" is a normal paragraph */
  variant?: "label" | "body";
  tone?: Tone;
}

export function Description({ description, variant = "label", tone = "dark", standalone }: DescriptionProps) {
  const motionProps = useStandalone(standalone);

  if (variant === "body") {
    const color = tone === "dark" ? "text-[#bdb7aa]" : "text-[#5a544c]";
    return (
      <motion.p variants={fade} {...motionProps} className={`max-w-[34rem] m text-base leading-[1.9] ${color}`}>
        {description}
      </motion.p>
    );
  }

  const color = tone === "dark" ? "text-[#e9a26b]" : "text-[#3f6b57]";
  const line = tone === "dark" ? "bg-[#e9a26b]" : "bg-[#3f6b57]";

  return (
    <motion.p
      variants={fade}
      {...motionProps}
      className={`mb-8 flex items-center gap-4 text-xs font-medium uppercase leading-6 tracking-[0.18em] ${color}`}
    >
      {/* <motion.span variants={rule} className={`h-px w-9 origin-left ${line}`} aria-hidden="true" /> */}
      {description}
    </motion.p>
  );
}