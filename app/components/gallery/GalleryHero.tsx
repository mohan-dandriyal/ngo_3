"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

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
    reduceMotion ? [0, 0] : [-30, 30]
  );

  return (
    <section
      ref={bannerRef}
      id="gallery-hero"
      className="relative w-full overflow-hidden text-[#ece6da]"
    >
      {/* Full-width banner */}
      <div className="relative flex items-center overflow-hidden min-h-[740px] sm:min-h-[560px] lg:min-h-[650px]">
        {/* Background image */}
        {data.image?.src && (
          <motion.div
            className="absolute inset-0 -z-20"
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
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#a8c686]/10 blur-[120px]"
        />

        <MainContainer>
          <div className="relative z-10 flex w-full flex-col items-start justify-center py-10 text-left sm:py-12 lg:py-14">
            {data.breadcrumb && (
              <div className="w-full text-left">
                <BreadCrumb breadcrumb={data.breadcrumb} className="mb-3 sm:mb-4 text-left" />
              </div>
            )}

            {/* Main content */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.2, 0.8, 0.15, 1] }}
              className="max-w-[850px] text-left"
            >
              {data.eyebrow && (
                <div className="mb-3 sm:mb-4">
                  <Eyebrow eyebrow={data.eyebrow} tone="dark" />
                </div>
              )}

              <div>
                <HeroTitle
                  titleStart={data.titleStart}
                  titleAccent={data.titleAccent}
                  titleEnd=""
                  tone="dark"
                />
              </div>

              {data.description && (
                <div className="mt-4 max-w-2xl text-left">
                  <Description
                    description={data.description}
                    variant="body"
                    tone="dark"
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
