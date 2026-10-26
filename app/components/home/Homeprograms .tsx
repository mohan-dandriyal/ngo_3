"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ProgramCard } from "../ProgramCard";
import { HomeProgramsContent } from "@/app/types/home";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

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

export default function HomePrograms({ data }: HomeProgramsContent) {
  const { eyebrow, titleStart, titleAccent, titleEnd, meta, programs = [] } = data;
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
        </div>
      </MainContainer>
    </section>
  );
}