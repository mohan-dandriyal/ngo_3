"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HomeAboutContent } from "@/app/types/home";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Whole section plays once when it scrolls into view */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* The eyebrow rule draws from left to right */
const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/* Headline words slide up out of a mask */
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

/* Link underline draws in after the copy */
const underline: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease } },
};

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").filter(Boolean).map((w, i) => (
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

export default function HomeAbout({ data }: HomeAboutContent) {
  const { eyebrow, titleLight, titleAccent, description, linkText, linkTo } = data;
  const reduce = useReducedMotion();

  return (
    <section className=" w-full bg-[#0a0a09] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#14110c]">
    <div>
      <MainContainer>
        
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid items-end gap-12 py-20 
                   lg:grid-cols-[1.9fr_1fr] lg:gap-20 "
        >
          {/* Headline */}
          <div>
            {eyebrow && (<Eyebrow eyebrow={eyebrow} />)}

           <SectionTitle titleStart={titleLight}
           titleAccent={titleAccent} />

           
          </div>

          {/* Supporting copy */}
          <div className="max-w-[26rem] lg:pb-3">
            <motion.p variants={fade} className="text-base leading-[1.9] text-[#edeae7]">
              {description}
            </motion.p>

            {linkText && (
              <motion.div variants={fade} className="mt-9">
                <motion.a
                  href={linkTo || "#"}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#d8d8d8]
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                           focus-visible:outline-[#e0503a]"
                >
                  {linkText}
                  <svg
                    viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M3 11L11 3M4.5 3H11v6.5" />
                  </svg>

                  {/* Underline: draws in on scroll, thickens on hover */}
                  <motion.span
                    variants={underline}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#e0503a]
                             transition-[height] duration-300 group-hover:h-[3px]"
                  />
                </motion.a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </MainContainer>
    </div>
    </section>
  );
}