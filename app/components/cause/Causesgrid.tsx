"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightSquare, ArrowUpRight } from "lucide-react";
import type { CauseItem, CausesGridLabels } from "@/app/types/cause";
import { formatMoney, percentOf } from "@/app/lib/causes-utils";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

interface CausesGridProps {
  causes: CauseItem[];
  labels: CausesGridLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow, SectionTitle and Description join the stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};
const bar: Variants = {
  hidden: { scaleX: 0 },
  show: (pct: number) => ({ scaleX: pct / 100, transition: { duration: 1.6, ease, delay: 0.3 } }),
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
      className="group relative flex flex-col overflow-hidden border border-[#e8c99a]/15 bg-[#121411]
                 transition-shadow duration-500 hover:shadow-[0_28px_50px_-26px_rgba(232,201,154,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#161a17]">
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
          <div className="h-full w-full bg-[linear-gradient(160deg,#3b7a68,#0a0a09)]" aria-hidden="true" />
        )}
        <span className="absolute bottom-4 left-4 bg-[#0a0a09] px-3.5 py-2 text-[13px] font-medium text-[#e8c99a]">
          {cause.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[30px] font-medium leading-[1.1] text-[#ece6da]">
          {cause.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-[#bdb7aa]">{cause.description}</p>

        <div>
          {
            cause?.btnText &&
            <Link href={cause.linkTo} className="group/link relative mt-9 inline-flex items-center gap-3 self-start pb-1.5 text-[13px] font-medium uppercase tracking-[0.14em]
                      text-[#f1ece1] hover:text-[#dc4d32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current" >
              {cause?.btnText}

              <ArrowUpRight />
            </Link>
          }
        </div>
      </div>
    </motion.article>
  );
}

export default function CausesGrid({ causes, labels }: CausesGridProps) {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => Array.from(new Set(causes.map((c) => c.category))), [causes]);
  const visible = category === "all" ? causes : causes.filter((c) => c.category === category);

  return (
    <section
      id="causes"
      className="w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(40%_30%_at_0%_100%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="py-20 lg:py-[120px]">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-20"
          >
            <div>
              {labels.eyebrow && <Eyebrow eyebrow={labels.eyebrow} />}
              <SectionTitle titleStart={labels.titleStart} titleAccent={labels.titleAccent} />
            </div>
            {labels.description && (
              <div className="lg:pb-3">
                <Description description={labels.description} variant="body" />
              </div>
            )}
          </motion.div>

          {/* Category filter */}
          {categories.length > 1 && (
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true }}
              role="group"
              aria-label="Filter causes by category"
              className="mt-12 flex flex-wrap gap-2.5"
            >
              {["all", ...categories].map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c)}
                    className={`relative px-5 py-2.5 text-sm font-medium outline-none transition-colors duration-300
                      focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a09]
                      ${active ? "text-[#14110c]" : "border border-[#e8c99a]/25 text-[#ece6da] hover:border-[#e8c99a]"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="causes-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#e8c99a]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c === "all" ? labels.allLabel : c}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

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
                <CauseCard key={c.slug} cause={c} labels={labels} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p role="status" className="mt-12 text-lg text-[#8f8a80]">
              {labels.emptyText}
            </p>
          )}
        </div>
      </MainContainer>
    </section>
  );
}