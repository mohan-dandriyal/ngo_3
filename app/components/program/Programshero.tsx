
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import type { ProgramItem, ProgramsHeroData } from "@/app/types/program";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface ProgramsHeroProps {
    data: ProgramsHeroData;
    programs: ProgramItem[];
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

const line: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease } },
};


export default function ProgramsHero({ data, programs = [] }: ProgramsHeroProps) {
    const { eyebrow, breadcrumb, titleStart, titleAccent, description, indexLabel, image } = data ?? ({} as ProgramsHeroData);
    const reduce = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(!image?.src);

    // The picture drifts slowly inside its frame while scrolling
    const frameRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, reduce ? 0 : 40]);

    return (
        <section
            id="programs-hero"
            className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_0%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    className="py-14 lg:py-24"
                >
                    <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                        <div>
                            {<BreadCrumb breadcrumb={breadcrumb} />}
                            {eyebrow && <Eyebrow eyebrow={eyebrow} />}

                            <HeroTitle titleStart={titleStart}
                                titleAccent={titleAccent} />


                            {description && (
                                <div className="mt-8">
                                    <Description description={description} variant="body" />
                                </div>
                            )}
                        </div>

                        <motion.figure
                            ref={frameRef}
                            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.35 }}
                            className="relative m-0 aspect-[4/5] w-full overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15"
                        >
                            {!imgFailed && image?.src ? (
                                <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={reduce ? false : { scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 2.2, ease, delay: 0.35 }}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt || ""}
                                            fill
                                            priority
                                            sizes="(min-width: 1024px) 38vw, 100vw"
                                            onError={() => setImgFailed(true)}
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
                            )}
                        </motion.figure>
                    </div>

                    {/* Program index: jump straight to a program below */}
                    {programs.length > 0 && (
                        <nav aria-label={indexLabel || "Programs"} className="mt-16 lg:mt-24">
                            {indexLabel && (
                                <motion.p variants={fadeUp} className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#e9a26b]">
                                    {indexLabel}
                                </motion.p>
                            )}
                            <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                                {programs.map((p) => (
                                    <motion.li key={p.id} variants={fadeUp} className="relative">
                                        <motion.span
                                            variants={line}
                                            aria-hidden="true"
                                            className="absolute left-0 top-0 h-px w-full origin-left bg-[#e8c99a]/25"
                                        />
                                        <a
                                            href={`#${p.id}`}
                                            className="group flex items-start justify-between gap-4 py-6 outline-none
                                 focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
                                        >
                                            <span>
                                                {p.number && (
                                                    <span className="block font-['Cormorant_Garamond',Georgia,serif] text-lg italic text-[#e0503a]">
                                                        {p.number}
                                                    </span>
                                                )}
                                                <span className="mt-1 block font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[26px] font-medium leading-tight text-[#ece6da] transition-colors duration-300 group-hover:text-[#e8c99a]">
                                                    {p.title}
                                                </span>
                                            </span>
                                            <ArrowDownRight
                                                size={20}
                                                aria-hidden="true"
                                                className="mt-1 flex-none text-[#8f8a80] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#e0503a]"
                                            />
                                        </a>
                                    </motion.li>
                                ))}
                            </ol>
                        </nav>
                    )}
                </motion.div>
            </MainContainer>
        </section>
    );
}