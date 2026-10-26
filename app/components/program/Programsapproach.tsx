"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ProgramsApproachData } from "@/app/types/program";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

interface ProgramsApproachProps {
  data: ProgramsApproachData;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow and SectionTitle join the stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const line: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};

export default function ProgramsApproach({ data }: ProgramsApproachProps) {
  const { eyebrow, titleStart, titleAccent, steps = [] } = data ?? ({} as ProgramsApproachData);
  const reduce = useReducedMotion();

  return (
    <section
      id="approach"
      className="w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(50%_50%_at_100%_100%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="py-20 lg:py-[120px]"
        >
          {eyebrow && <Eyebrow eyebrow={eyebrow} />}
          <SectionTitle titleStart={titleStart} titleAccent={titleAccent} />

          <ol className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li key={s.title} variants={fadeUp} className="group relative pt-8">
                {/* Line draws across and turns red on hover */}
                <motion.span
                  variants={line}
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[#e8c99a]/30 transition-colors duration-300 group-hover:bg-[#e0503a]"
                />
                <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-[#e0503a]" />

                <span className="font-['Cormorant_Garamond',Georgia,serif] text-[clamp(48px,5vw,76px)] font-medium italic leading-none text-[#e0503a]">
                  {s.number ?? String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[30px] font-medium leading-tight text-[#ece6da] transition-transform duration-300 group-hover:translate-x-1.5">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[30ch] text-[15px] leading-[1.8]">{s.description}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </MainContainer>
    </section>
  );
}