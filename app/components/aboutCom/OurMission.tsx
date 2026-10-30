"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Mission } from "@/app/types/about";
import PrimaryButton from "../ui/PrimaryButton";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

export default function OurMission({ missionPoints }: Mission) {
    const {
        eyebrow,
        titleStart,
        titleAccent,
        description,
        linkText,
        linkTo,
        image,
        listLabel,
        items = [],
    } = missionPoints ?? ({} as Mission);

    const reduce = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(!image?.src);

    const container: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
    };
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
    };

    return (
        <section
            id="our-mission"
            className="relative w-full overflow-hidden bg-[#faf8f5] py-20 text-[#141714] md:py-28
                       font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                {/* Section heading */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
                >
                    <div className="lg:col-span-8">
                        {eyebrow && <Eyebrow eyebrow={eyebrow} tone="light" />}
                        <SectionTitle titleStart={titleStart} titleAccent={titleAccent} tone="light" />
                    </div>

                    {description && (
                        <div className="lg:col-span-4 lg:pb-2">
                            <Description description={description} variant="body" tone="light" />
                        </div>
                    )}
                </motion.div>

                {/* Image and mission points */}
                <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-12 lg:gap-14">
                    {/* Image */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        className="group relative min-h-[340px] overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_12px_30px_-10px_rgba(20,24,20,0.08)] sm:min-h-[440px] lg:col-span-7 lg:min-h-[560px]"
                    >
                        {!imgFailed && image?.src ? (
                            <Image
                                src={image.src}
                                alt={image.alt || ""}
                                fill
                                sizes="(max-width: 1024px) 100vw, 58vw"
                                onError={() => setImgFailed(true)}
                                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]
                                           motion-reduce:transition-none"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

                        {(image?.captionLabel || image?.caption) && (
                            <div className="absolute bottom-6 left-6 right-6 sm:bottom-9 sm:left-9">
                                {image.captionLabel && (
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c99a]">{image.captionLabel}</span>
                                )}
                                {image.caption && (
                                    <p className="mt-2 max-w-md font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-medium leading-snug text-white sm:text-3xl">
                                        {image.caption}
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Mission list */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        className="flex flex-col justify-center lg:col-span-5"
                    >
                        {listLabel && (
                            <motion.p variants={fadeUp} className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#e0503a]">
                                {listLabel}
                            </motion.p>
                        )}

                        {items && items.map((point) => (
                            <motion.div
                                key={point.number ?? point.title}
                                variants={fadeUp}
                                className="group border-t border-[#141714]/15 py-6 sm:py-8"
                            >
                                <div className="flex items-start gap-5">
                                    {point.number && (
                                        <span className="pt-1 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-lg font-bold italic text-[#e0503a]">
                                            {point.number}
                                        </span>
                                    )}

                                    <div className="flex-1">
                                        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-bold leading-tight text-[#141714] transition-colors group-hover:text-[#e0503a] sm:text-3xl">
                                            {point.title}
                                        </h3>
                                        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#4e554e]">{point.description}</p>
                                    </div>

                                    <ArrowUpRight
                                        size={18}
                                        aria-hidden="true"
                                        className="shrink-0 text-[#737a73] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e0503a]"
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {linkText && (
                            <motion.div variants={fadeUp} className="mt-4 flex border-t border-[#141714]/15 pt-8">
                                <PrimaryButton href={linkTo || "#"} >
                                    {linkText}
                                </PrimaryButton>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    );
}
