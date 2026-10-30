
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Program = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

type ProgramCardProps = {
  program: Program;
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.35 }}
      className="group flex h-full flex-col overflow-hidden border border-white/[0.07] bg-[#171b16]"
    >
      <Link
        href={program.href}
        aria-label={`Read more about ${program.title}`}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#20251f]">
          <Image
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />

          {/* Small coral accent */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#e0503a] transition-all duration-500 group-hover:w-full" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col bg-[#171b16] p-5 sm:p-6">
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold leading-tight text-[#ece6da] sm:text-[28px]">
            {program.title}
          </h3>

          <p className="mt-3 min-h-[4.5rem] text-[13px] leading-[1.9] text-[#bdb7aa] sm:text-sm">
            {program.description}
          </p>

        </div>
      </Link>
    </motion.article>
  );
}
