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
  linkText?: string;
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
      className="group flex h-full flex-col overflow-hidden rounded-xs border border-[#e5dfd5] bg-white shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-300 hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]"
    >
      <Link
        href={program.href}
        aria-label={`Read more about ${program.title}`}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#ede7dc]">
          <Image
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />

          {/* Coral accent bar on hover */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#e0503a] transition-all duration-500 group-hover:w-full" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col bg-white p-6 sm:p-7">
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold leading-snug text-[#141714] transition-colors duration-300 group-hover:text-[#e0503a] sm:text-[26px]">
            {program.title}
          </h3>

          <p className="mt-3 flex-1 text-[14px] leading-[1.85] text-[#525a52]">
            {program.description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e0503a]">
            <span>{program.linkText || "Explore program"}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
