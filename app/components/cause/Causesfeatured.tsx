"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CauseItem, CausesFeaturedLabels } from "@/app/types/cause";
import { formatMoney, percentOf } from "@/app/lib/causes-utils";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, HeroTitle, SectionTitle } from "../ui/SectionContent";
import CountUp from "@/app/components/program/Countup";

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
const bar: Variants = {
    hidden: { scaleX: 0 },
    show: (pct: number) => ({ scaleX: pct / 100, transition: { duration: 1.8, ease, delay: 0.4 } }),
};

export default function CausesFeatured({ cause, labels }: CausesFeaturedProps) {
    const reduce = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(!cause.image);
    const [picked] = useState(0);

    const amounts = cause.amounts ?? [];
    const chosen = amounts[picked];

    // Days left is worked out in the browser so server and client output always match
    const [daysLeft, setDaysLeft] = useState<number | null>(null);
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            if (!cause.endDate) {
                setDaysLeft(null);
                return;
            }

            const diff = Math.ceil((new Date(cause.endDate).getTime() - Date.now()) / 86400000);
            setDaysLeft(diff > 0 ? diff : null);
        }, 0);

        return () => window.clearTimeout(timeout);
    }, [cause.endDate]);

    // The picture drifts slowly inside its frame while scrolling
    const frameRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -36, reduce ? 0 : 36]);

  

    return (
        <section
            id="featured-cause"
            className="w-full overflow-hidden bg-[#0A0B09] text-[#14110c] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-[120px]"
                >
                    {/* Image */}
                    <motion.div
                        ref={frameRef}
                        variants={frame}
                        className="relative aspect-[4/5] w-full overflow-hidden bg-[#161a17] sm:aspect-[5/4] lg:aspect-[4/5]"
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
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,#3b7a68,#0a0a09)]" aria-hidden="true" />
                        )}
                        <span className="absolute bottom-5 left-5 bg-[#0a0a09] px-3.5 py-2 text-[13px] font-medium text-[#e8c99a]">
                            {cause.category}
                        </span>
                        
                    </motion.div>

                    {/* Content */}
                    <div>
                        {labels.eyebrow && <Eyebrow eyebrow={labels.eyebrow} />}

                        <SectionTitle titleStart={cause.title} />

                        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[17px] leading-[1.85] text-[#c8c8c8]">
                            {cause.description}
                        </motion.p>

                        
                        <motion.div variants={fadeUp} className="mt-8">
                            <Link
                                href={cause.linkTo}
                                className="group relative inline-flex items-center gap-4 overflow-hidden bg-[#e0503a] px-7 py-[18px]
                           text-[15px] font-semibold text-[#14110c] outline-none transition-shadow duration-300
                           hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.7)]
                           focus-visible:ring-2 focus-visible:ring-[#14110c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e8e1d5]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 -translate-x-full bg-[#ef6e58] transition-transform duration-500 ease-out
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