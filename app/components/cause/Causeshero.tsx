"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CausesHeroData, HeroStat } from "@/app/types/cause";
import MainContainer from "../ui/MainContainer";
import PrimaryButton from "../ui/PrimaryButton";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import CountUp from "@/app/components/program/Countup";
import BreadCrumb from "../ui/BreadCrumb";

interface CausesHeroProps {
    data: CausesHeroData;
    /** Totals are worked out from the causes list, so they never go out of date */
    stats: HeroStat[];
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow and Description join the same stagger */
const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const headline: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const word: Variants = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 1.1, ease } },
};
const panel: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.35, staggerChildren: 0.12, delayChildren: 0.5 } },
};
const line: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease } },
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

export default function CausesHero({ data, stats }: CausesHeroProps) {
    const { eyebrow, breadcrumb, titleStart, titleAccent, description, primaryButton } = data ?? ({} as CausesHeroData);
    const reduce = useReducedMotion();

    return (
        <section
            id="causes-hero"
            className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_0%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            {/* Soft red glow behind the totals, slowly breathing */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#e0503a]/20 blur-[120px]"
                animate={reduce ? undefined : { opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <MainContainer>
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    className="relative grid items-center gap-14 py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-28"
                >
                    <div>
                        <BreadCrumb  breadcrumb={breadcrumb}/>
                        {eyebrow && <Eyebrow eyebrow={eyebrow} />}

                        <HeroTitle titleStart={titleStart}
                            titleAccent={titleAccent} />

                        {description && (
                            <div className="mt-8">
                                <Description description={description} variant="body" />
                            </div>
                        )}

                        {primaryButton?.text && (
                            <motion.div variants={fadeUp} className="mt-10">
                                <PrimaryButton href={primaryButton.link || "#"}>
                                    {primaryButton?.text}
                                </PrimaryButton>
                            </motion.div>
                        )}
                    </div>

                    {/* Totals */}
                    {stats.length > 0 && (
                        <motion.dl
                            variants={panel}
                            className="relative bg-[#17261e] p-8 ring-1 ring-[#e8c99a]/15 sm:p-10"
                        >
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    variants={fadeUp}
                                    className={`relative flex flex-col-reverse ${i === 0 ? "pb-8" : "py-8"} ${i === stats.length - 1 ? "pb-0" : ""}`}
                                >
                                    {i > 0 && (
                                        <motion.span
                                            variants={line}
                                            aria-hidden="true"
                                            className="absolute left-0 top-0 h-px w-full origin-left bg-[#e8c99a]/25"
                                        />
                                    )}
                                    <dt className="mt-3 text-[15px] text-[#bdb7aa]">{s.label}</dt>
                                    <dd
                                        className={`m-0 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] font-medium leading-none tracking-[-0.02em] text-[#ece6da]
                      ${i === 0 ? "text-[clamp(48px,5.4vw,84px)]" : "text-[clamp(38px,4vw,60px)]"}`}
                                    >
                                        {s.prefix}
                                        <CountUp value={s.value} />
                                    </dd>
                                </motion.div>
                            ))}
                        </motion.dl>
                    )}
                </motion.div>
            </MainContainer>
        </section>
    );
}