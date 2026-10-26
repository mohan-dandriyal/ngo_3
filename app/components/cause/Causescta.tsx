"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CausesCtaData } from "@/app/types/cause";
import MainContainer from "../ui/MainContainer";

interface CausesCtaProps {
  data: CausesCtaData;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

function Words({ text }: { text: string }) {
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
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
    </>
  );
}

export default function CausesCta({ data }: CausesCtaProps) {
  const { eyebrow, titleStart, titleAccent, description, primaryButton, secondaryButton } =
    data ?? ({} as CausesCtaData);
  const reduce = useReducedMotion();

  return (
    <section
      id="give-where-needed"
      className="relative w-full overflow-hidden bg-[#e0503a] text-[#14110c] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -bottom-40 h-[520px] w-[520px] rounded-full bg-[#ef6e58]/70"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative grid items-end gap-10 py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-20 lg:py-[120px]"
        >
          <div>
            {eyebrow && (
              <motion.p variants={fadeUp} className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em]">
                <span className="h-px w-9 bg-[#14110c]" aria-hidden="true" />
                {eyebrow}
              </motion.p>
            )}
            <motion.h2
              variants={headline}
              aria-label={`${titleStart} ${titleAccent}`}
              className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(46px,6.6vw,100px)]
                         font-medium leading-[0.98] tracking-[-0.02em]"
            >
              <Words text={titleStart} />
              <em className="font-medium italic">
                <Words text={titleAccent} />
              </em>
            </motion.h2>
          </div>

          <div className="max-w-[26rem] lg:pb-3">
            {description && (
              <motion.p variants={fadeUp} className="text-base leading-[1.9] text-[#14110c]/80">
                {description}
              </motion.p>
            )}

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {primaryButton?.text && (
                <Link
                  href={primaryButton.link || "#"}
                  className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-[#14110c] px-6 py-[18px]
                             text-[15px] font-semibold text-[#f1ece1] outline-none transition-shadow duration-300
                             hover:shadow-[0_12px_34px_-10px_rgba(20,17,12,0.7)]
                             focus-visible:ring-2 focus-visible:ring-[#14110c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e0503a]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-[#27382e] transition-transform duration-500 ease-out
                               group-hover:translate-x-0 motion-reduce:transition-none"
                  />
                  <span className="relative">{primaryButton.text}</span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )}

              {secondaryButton?.text && (
                <Link
                  href={secondaryButton.link || "#"}
                  className="group relative inline-flex items-center justify-center gap-4 overflow-hidden border border-[#14110c]/60 px-6 py-[18px]
                             text-[15px] font-semibold text-[#14110c] outline-none transition-colors duration-300 hover:border-[#14110c]
                             focus-visible:ring-2 focus-visible:ring-[#14110c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e0503a]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-[#14110c] transition-transform duration-500 ease-out
                               group-hover:scale-y-100 motion-reduce:transition-none"
                  />
                  <span className="relative transition-colors duration-300 group-hover:text-[#f1ece1]">
                    {secondaryButton.text}
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="relative transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f1ece1]"
                  />
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}