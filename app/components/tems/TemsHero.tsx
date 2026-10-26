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
import { ArrowDown } from "lucide-react";
import type { TeamHero as TeamHeroType } from "@/app/types/team";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface TeamHeroProps {
    data: TeamHeroType;
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

function Words({ text, className = "" }: { text: string; className?: string }) {
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
                        <motion.span variants={word} className={`inline-block ${className}`}>
                            {w}
                        </motion.span>
                    </span>
                ))}
        </>
    );
}

/* One photo: reveals on load, then drifts at its own speed while scrolling */
function TeamPhoto({
    image,
    aspect,
    drift,
    delay,
    priority,
    reduce,
}: {
    image: { src: string; alt?: string };
    aspect: string;
    drift: [number, number];
    delay: number;
    priority?: boolean;
    reduce: boolean | null;
}) {
    const ref = useRef<HTMLElement>(null);
    const [failed, setFailed] = useState(!image?.src);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : drift);

    return (
        <motion.figure
            ref={ref}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1], delay }}
            className={`relative m-0 w-full overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15 ${aspect}`}
        >
            {!failed ? (
                <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y }}>
                    <motion.div
                        className="absolute inset-0"
                        initial={reduce ? false : { scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease, delay }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt || ""}
                            fill
                            priority={priority}
                            sizes="(min-width: 1024px) 30vw, 40vw"
                            onError={() => setFailed(true)}
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>
            ) : (
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
            )}
        </motion.figure>
    );
}

export default function TeamHero({ data }: TeamHeroProps) {
    const {
        breadcrumb,
        eyebrow,
        titleStart,
        titleAccent,
        description,
        scrollText,
        scrollTarget = "#team",
        images = [],
    } = data ?? ({} as TeamHeroType);

    const reduce = useReducedMotion();

    // Each photo has its own shape and scroll speed so the row feels layered
    const layout = [
        { aspect: "aspect-[4/5]", drift: [30, -30] as [number, number], delay: 0.35 },
        { aspect: "aspect-[3/4]", drift: [-25, 45] as [number, number], delay: 0.5 },
        { aspect: "aspect-square", drift: [20, -20] as [number, number], delay: 0.65 },
    ];

    return (
        <section
            id="team-hero"
            className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_100%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                <div className="py-14 lg:py-24">
                    <motion.div
                        variants={container}
                        initial={reduce ? false : "hidden"}
                        animate="show"
                        className="grid items-end gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-20"
                    >
                        <div>

                            <BreadCrumb breadcrumb={breadcrumb} />


                            {eyebrow && <Eyebrow eyebrow={eyebrow} />}

                            <motion.h1
                                variants={headline}
                                aria-label={`${titleStart} ${titleAccent}`}
                                className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(56px,8.6vw,100px)]
                           font-medium leading-[0.98] tracking-[-0.02em] text-[#ece6da]"
                            >
                                <Words text={titleStart} />
                                <em className="font-medium italic text-[#e0503a]">
                                    <Words text={titleAccent} />
                                </em>
                            </motion.h1>
                        </div>

                        <div className="max-w-[26rem] lg:pb-4">
                            {description && <Description description={description} variant="body" />}

                            {scrollText && (
                                <motion.div variants={fadeUp} className="mt-8">
                                    <a
                                        href={scrollTarget}
                                        className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#ece6da]
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                                    >
                                        {scrollText}
                                        <ArrowDown
                                            size={16}
                                            aria-hidden="true"
                                            className="transition-transform duration-300 group-hover:translate-y-1"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                                        />
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Photo row */}
                    {images.length > 0 && (
                        <div className="mt-14 grid grid-cols-[1.2fr_1fr_0.8fr] items-end gap-3 sm:gap-6 lg:mt-20">
                            {images.slice(0, 3).map((img, i) => (
                                <TeamPhoto
                                    key={img.src ?? i}
                                    image={img}
                                    aspect={layout[i].aspect}
                                    drift={layout[i].drift}
                                    delay={layout[i].delay}
                                    priority={i === 0}
                                    reduce={reduce}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </MainContainer>
        </section>
    );
}