"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import ProgramCard from "@/app/components/ProgramCard";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

type Program = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  theme?: "coral" | "green" | "sand" | string;
  href: string;
};

type HomeProgramsContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent?: string;
    titleEnd?: string;
    description?: string;
    meta?: string;
    button?: {
      href: string;
      label: string;
    };
    programs?: Program[];
  };
};

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

const grid: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function HomePrograms({ data }: HomeProgramsContent) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd,
    description,
    meta,
    button,
    programs = [],
  } = data;

  const reduce = useReducedMotion();

  return (
    <section
      id="programs"
      className="relative w-full overflow-hidden bg-white py-20 text-[#141714] sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/3 h-[420px] w-[420px] rounded-full bg-[#2a5c43]/[0.03] blur-[130px]"
      />

      <MainContainer>
        <div className="relative">
          {/* Section heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12"
          >
            <div className="max-w-[750px]">
              {eyebrow && (
                <motion.div variants={rise} className="mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </motion.div>
              )}

              <motion.div variants={rise}>
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="light"
                />
              </motion.div>
            </div>

            <div className="max-w-[390px] lg:pb-3">
              {description && (
                <motion.p
                  variants={rise}
                  className="text-sm leading-7 text-[#555d55] sm:text-base sm:leading-8"
                >
                  {description}
                </motion.p>
              )}

              {meta && (
                <motion.p
                  variants={rise}
                  className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2a5c43]"
                >
                  {meta}
                </motion.p>
              )}

              {/* All programs CTA */}
              {button?.label && (
                <motion.div
                  variants={rise}
                  initial={reduce ? false : "hidden"}
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-7"
                >
                  <Link
                    href={button.href || "/our-program"}
                    className="group inline-flex items-center gap-3 border-b-2 border-[#e0503a] pb-1.5 text-sm font-semibold text-[#141714] transition-colors duration-300 hover:text-[#e0503a]"
                  >
                    {button.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Program cards */}
          {programs.length > 0 && (
            <motion.div
              variants={grid}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
            >
              {programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                />
              ))}
            </motion.div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
