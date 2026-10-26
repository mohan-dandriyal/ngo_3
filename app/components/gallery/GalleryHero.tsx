
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryHeroData } from "@/app/types/gallery";
import BreadCrumb from "../ui/BreadCrumb";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, HeroTitle } from "../ui/SectionContent";

type GalleryHeroProps = {
    data: GalleryHeroData;
};

export default function GalleryHero({ data }: GalleryHeroProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="overflow-hidden bg-[#0A0B09] px-5 pb-16 pt-8 text-[#EAE3D6] sm:px-8 md:pb-24 lg:px-16 lg:pt-12">
            <MainContainer>

                <BreadCrumb breadcrumb={data.breadcrumb} />

                <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Eyebrow eyebrow={data.eyebrow} />

                        <HeroTitle
                            titleStart={data.titleStart}
                            titleAccent={data.titleAccent}
                            titleEnd=""
                            tone="dark"
                        />

                        <div className="mt-6">
                            <Description description={data.description} />
                        </div>
                          

                        <Link
                            href={data.scrollTarget}
                            className="mt-10 inline-flex items-center gap-3 border-b border-[#55564F] pb-3 text-sm transition-colors hover:border-[#EE503B] hover:text-[#EE503B]"
                        >
                            {data.scrollText}
                            <ArrowDownRight size={18} aria-hidden="true" />
                        </Link>
                    </motion.div>

                    <motion.figure
                        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#20211C] md:aspect-[5/4]">
                            <Image
                                src={data.image.src}
                                alt={data.image.alt}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        </div>

                    </motion.figure>
                </div>
            </MainContainer>
        </section>
    );
}
