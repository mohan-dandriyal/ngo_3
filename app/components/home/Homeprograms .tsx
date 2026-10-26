"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentProps } from "react";
import { ProgramCard } from "../ProgramCard";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import Link from "next/link";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Heading block plays first */
const headingContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};



/* Cards follow, one after another */
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

type HomeProgramsContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent?: string;
    titleEnd?: string;
    meta?: string;
    button: { href?: string; label: string };
    programs?: ComponentProps<typeof ProgramCard>["program"][];
  };
};

export default function HomePrograms({ data }: HomeProgramsContent) {
  const { eyebrow, titleStart, titleAccent, titleEnd, meta, button, programs = [] } = data;
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden f-wull  font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]">
      <MainContainer>
        <div className="">
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              {eyebrow && (
                <Eyebrow eyebrow={eyebrow} />
              )}

              <SectionTitle
                titleStart={titleStart}
                titleAccent={titleAccent}
                titleEnd={titleEnd}
                tone={'dark'}
              />
            </div>
            {meta && (
              <motion.p variants={rise} className="font-mono text-xs tracking-wide text-[#8f8a80] lg:pb-3">
                {meta}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={grid}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {programs.map((p, i) => (
              <ProgramCard key={i} program={p} />
            ))}
          </motion.div>

          <motion.div variants={rise} className="mt-8 text-right">
            <Link
              href={button.href || "#"}
              className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#FFFF]
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
            >
              {button.label}
              <svg
                viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M3 11L11 3M4.5 3H11v6.5" />
              </svg>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
              />
            </Link>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}