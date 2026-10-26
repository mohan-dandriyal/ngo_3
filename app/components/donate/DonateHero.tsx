
"use client";

import Image from "next/image";
import { ArrowDownRight, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { DonateHeroData } from "@/app/types/donate";
import BreadCrumb from "../ui/BreadCrumb";
import MainContainer from "../ui/MainContainer";

type Props = {
  data: DonateHeroData;
};

export default function DonateHero({ data }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#0A0B09] px-5 pb-16  text-[#EAE3D6] sm:px-8 md:pb-24 lg:px-16">
      <MainContainer>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <BreadCrumb breadcrumb={data.breadcrumb} />

            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.4rem]">
              {data.titleStart}
              <br />
              <span className="italic text-[#EE503B]">
                {data.titleAccent}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#B9B5AC] md:text-lg">
              {data.description}
            </p>

            <a
              href="#donation-form"
              className="mt-9 inline-flex items-center gap-4 bg-[#EE503B] px-6 py-4 text-sm text-white transition-colors hover:bg-[#D94330]"
            >
              <Heart size={17} aria-hidden="true" />
              {data.primaryCta}
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>

            <p className="mt-6 flex items-center gap-3 text-xs text-[#B9B5AC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EE503B]" />
              {data.trustNote}
            </p>
          </motion.div>

          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative aspect-[4/4.5] overflow-hidden bg-[#20211C] sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
              <div className="absolute bottom-6 left-6 right-6 border-l-2 border-[#EE503B] pl-4">
                <p className="max-w-xs font-serif text-2xl italic text-white md:text-3xl">
                  {data.imageCaption}
                </p>
              </div>
            </div>
          </motion.figure>
        </div>
      </MainContainer>
    </section>
  );
}
