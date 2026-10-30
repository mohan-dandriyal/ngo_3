"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

interface ProgramsApproachStep {
  number?: string;
  title: string;
  description: string;
}

interface ProgramsApproachData {
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  steps?: ProgramsApproachStep[];
}

interface ProgramsApproachProps {
  data: ProgramsApproachData;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

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
      className="w-full overflow-hidden bg-white py-20 lg:py-28 text-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {eyebrow && <Eyebrow eyebrow={eyebrow} tone="light" />}
          <SectionTitle titleStart={titleStart} titleAccent={titleAccent} tone="light" />

          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-18 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li key={s.title} variants={fadeUp} className="group relative pt-8">
                {/* Line draws across */}
                <motion.span
                  variants={line}
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[#141714]/15 transition-colors duration-300 group-hover:bg-[#e0503a]"
                />
                <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[10px] w-[10px] rounded-full bg-[#e0503a]" />

                <span className="font-['Cormorant_Garamond',Georgia,serif] text-[clamp(48px,5vw,72px)] font-bold italic leading-none text-[#e0503a]">
                  {s.number ?? String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[26px] font-bold leading-tight text-[#141714] transition-transform duration-300 group-hover:translate-x-1.5">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-[30ch] text-[14px] leading-[1.8] text-[#505750]">{s.description}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </MainContainer>
    </section>
  );
}
