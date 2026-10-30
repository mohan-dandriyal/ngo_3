"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CauseItem, CausesGridLabels } from "@/app/types/cause";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

interface CausesGridProps {
  causes: CauseItem[];
  labels: CausesGridLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

function CauseCard({ cause, labels }: { cause: CauseItem; labels: CausesGridLabels }) {
  const [failed, setFailed] = useState(!cause.image);

  return (
    <motion.article
      layout
      variants={cardVariants}
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xs border border-[#e5dfd5] bg-white shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-500 hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#ede7dc]">
        {!failed && cause.image ? (
          <Image
            src={cause.image}
            alt={cause.imageAlt || ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
        )}
        <span className="absolute bottom-4 left-4 border border-black/10 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#141714] shadow-xs backdrop-blur-md">
          {cause.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[28px] font-bold leading-[1.15] text-[#141714] transition-colors group-hover:text-[#e0503a]">
          {cause.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#505750]">{cause.description}</p>

        <div className="mt-auto pt-6">
          <span className="group/link relative inline-flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-wider text-[#141714] transition-colors group-hover:text-[#e0503a]">
            <span>{labels.learnMoreLabel || "View Details"}</span>
            <ArrowUpRight size={14} className="text-[#e0503a] transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function CausesGrid({ causes, labels }: CausesGridProps) {
  const reduce = useReducedMotion();
  const visible = causes;

  return (
    <section
      id="causes-grid"
      className="w-full overflow-hidden bg-[#faf8f5] py-20 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#141714]"
    >
      <MainContainer>
        <div>
          {/* Section Heading */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12"
          >
            <div className="max-w-[700px]">
              {labels.eyebrow && <Eyebrow eyebrow={labels.eyebrow} tone="light" />}
              <SectionTitle titleStart={labels.titleStart} titleAccent={labels.titleAccent} tone="light" />
            </div>

            {labels.description && (
              <div className="max-w-[420px] lg:pb-3">
                <Description description={labels.description} variant="body" tone="light" />
              </div>
            )}
          </motion.div>

          <motion.div
            layout
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((c) => (
                <div key={c.slug}>
                  <Link href={c.linkTo || `/our-cause/${c.slug}`}>
                    <CauseCard cause={c} labels={labels} />
                  </Link>
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p role="status" className="mt-12 text-lg text-[#737a73]">
              {labels.emptyText}
            </p>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
