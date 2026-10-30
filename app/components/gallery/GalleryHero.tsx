
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import type { GalleryHeroData } from "@/app/types/gallery";

import BreadCrumb from "../ui/BreadCrumb";
import MainContainer from "../ui/MainContainer";
import {
  Description,
  Eyebrow,
  HeroTitle,
} from "../ui/SectionContent";

type GalleryHeroProps = {
  data: GalleryHeroData;
};

export default function GalleryHero({ data }: GalleryHeroProps) {
  const reduceMotion = useReducedMotion();
  const bannerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-45, 45]
  );

  return (
    <section
      ref={bannerRef}
      id="gallery-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] text-[#ece6da]"
    >
      {/* Full-width banner */}
      <div className="relative min-h-[680px] overflow-hidden lg:min-h-[760px]">

        {/* Background image */}
        {data.image?.src && (
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY }}
          >
            <Image
              src={data.image.src}
              alt={data.image.alt || ""}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        )}

        {/* Image overlays */}
        <div className="absolute inset-0 bg-black/70" />

        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#080b09]/95 via-[#080b09]/70 to-[#080b09]/25" /> */}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-transparent to-black/20" /> */}

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        <MainContainer>
          <div className="relative z-10 flex min-h-[680px] flex-col justify-between py-10 lg:min-h-[760px] lg:py-14">

            {/* Main content */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.15, 1] }}
              className="max-w-4xl pt-8 lg:pt-14"
            >
              <BreadCrumb breadcrumb={data.breadcrumb} />

              {data.eyebrow && (
                <div className="mt-10">
                  <Eyebrow eyebrow={data.eyebrow} />
                </div>
              )}

              <div className="mt-8">
                <HeroTitle
                  titleStart={data.titleStart}
                  titleAccent={data.titleAccent}
                  titleEnd=""
                  tone="dark"
                />
              </div>

              {data.description && (
                <div className="mt-7 max-w-2xl">
                  <Description
                    description={data.description}
                    variant="body"
                  />
                </div>
              )}

             
            </motion.div>

           
          </div>
        </MainContainer>
      </div>
    </section>
  );
}
