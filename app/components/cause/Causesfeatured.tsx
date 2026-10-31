"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CauseItem, CausesFeaturedLabels } from "@/app/types/cause";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

interface CausesFeaturedProps {
    cause: CauseItem;
    labels: CausesFeaturedLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const frame: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: [0.7, 0, 0.2, 1] } },
};
const picture: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 2, ease } },
};

export default function CausesFeatured({ cause, labels }: CausesFeaturedProps) {
    const reduce = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(!cause.image);

    const frameRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -36, reduce ? 0 : 36]);

    return (
        <section
            id="featured-cause"
            className="w-full overflow-hidden bg-white text-[#141714] py-14 sm:py-16 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid items-center gap-12 py-8 lg:grid-cols-2 lg:gap-20"
                >
                    {/* Image */}
                    <motion.div
                        ref={frameRef}
                        variants={frame}
                        className="relative aspect-[4/5] w-full overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_12px_30px_-10px_rgba(20,24,20,0.08)] sm:aspect-[5/4] lg:aspect-[4/5]"
                    >
                        {!imgFailed && cause.image ? (
                            <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y }}>
                                <motion.div variants={picture} className="absolute inset-0">
                                    <Image
                                        src={cause.image}
                                        alt={cause.imageAlt || ""}
                                        fill
                                        sizes="(min-width: 1024px) 45vw, 100vw"
                                        onError={() => setImgFailed(true)}
                                        className="object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
                        )}
                        <span className="absolute bottom-5 left-5 border border-black/10 bg-white/95 px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wider text-[#141714] shadow-xs backdrop-blur-md">
                            {cause.category}
                        </span>
                    </motion.div>

                    {/* Content */}
                    <div>
                        {labels.eyebrow && <Eyebrow eyebrow={labels.eyebrow} tone="light" />}

                        <SectionTitle titleStart={cause.title} tone="light" />

                        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[17px] leading-[1.85] text-[#4e554e]">
                            {cause.description}
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-8">
                            <Link
                                href={cause.linkTo}
                                className="group relative inline-flex items-center gap-4 overflow-hidden bg-[#e0503a] px-7 py-[18px]
                                   text-[15px] font-semibold text-white outline-none transition-shadow duration-300
                                   hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.5)]
                                   focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-4"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 -translate-x-full bg-[#f06450] transition-transform duration-500 ease-out
                                     group-hover:translate-x-0 motion-reduce:transition-none"
                                />
                                <span className="relative">
                                    {labels.donateText}
                                </span>
                                <ArrowUpRight
                                    size={17}
                                    aria-hidden="true"
                                    className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </MainContainer>
        </section>
    );
}
