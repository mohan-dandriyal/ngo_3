"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CauseCard } from "@/app/components/ui/Causecard";
import { HomeCausesContent } from "@/app/types/home";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import Link from "next/link";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const headingContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};


const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

export default function HomeCauses({ data }: HomeCausesContent) {
    const { eyebrow, titleStart, titleAccent, titleEnd, description, linkText, linkTo, causes = [] } = data;
    const reduce = useReducedMotion();

    return (
        <section
            id="causes"
            className="overflow-hidden font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#14110c]"
        >
            <MainContainer>
            <div className="mx-auto py-20  lg:py-[120px]">
                {/* Heading */}
                <motion.div
                    variants={headingContainer}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-20"
                >
                    <div>


                        <Eyebrow eyebrow={eyebrow} tone="light" />

                        <SectionTitle
                            titleStart={titleStart}
                            titleAccent={titleAccent}
                            titleEnd={titleEnd}
                            tone={'light'}
                        />
                    </div>

                    <div className="max-w-[26rem] lg:pb-3">
                        {description && (
                            <motion.p variants={rise} className="text-base leading-[1.9] text-[#5a544c]">
                                {description}
                            </motion.p>
                        )}

                        {linkText && (
                            <motion.div variants={rise} className="mt-8">
                                <Link
                                    href={linkTo || "#"}
                                    className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#14110c]
                             focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                                >
                                    {linkText}
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
                        )}
                    </div>
                </motion.div>

                {/* Cause cards */}
                <motion.div
                    variants={grid}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.12 }}
                    className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {causes.map((c, i) => (
                        <CauseCard key={i} cause={c} />
                    ))}
                </motion.div>
            </div>
            </MainContainer>
        </section>
    );
}