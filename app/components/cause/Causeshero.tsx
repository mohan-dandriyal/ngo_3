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

const panel: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.35, staggerChildren: 0.12, delayChildren: 0.5 } },
};
const line: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease } },
};


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
                    className="relative grid items-end gap-14 py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-28"
                >
                    <div>
                        <BreadCrumb
                            breadcrumb={breadcrumb} />
                        {eyebrow && <Eyebrow eyebrow={eyebrow} />}

                        <HeroTitle titleStart={titleStart}
                            titleAccent={titleAccent} />

                        {description && (
                            <div className="mt-8 lg:hidden blick">
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
                    <div className="lg:block hidden">
                        {description && (
                            <div className="mt-8">
                                <Description description={description} variant="body" />
                            </div>
                        )}
                    </div>
                </motion.div>
            </MainContainer>
        </section>
    );
}