"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.15 } },
};
const pictureVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.6, ease, delay: 0.15 } },
};

function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const displayedValue = reduce ? value : display;

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.2, 0.8, 0.15, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref}>{format(displayedValue)}</span>;
}

type CauseItem = {
  goal?: number;
  raised?: number;
  currency?: string;
  image: string;
  imageAlt?: string;
  category?: string;
  title: string;
  description: string;
  linkTo?: string;
  linkText?: string;
};

export function CauseCard({ causeItem }: { causeItem: CauseItem }) {
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  const goal = causeItem.goal || 0;
  const raised = causeItem.raised || 0;
  const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  const money = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: causeItem.currency || "INR",
    maximumFractionDigits: 0,
  });

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-xs border border-[#e5dfd5] bg-white
                 shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-500 hover:border-[#e0503a]/40 hover:shadow-[0_20px_40px_-12px_rgba(20,24,20,0.12)]"
    >
      {/* Image */}
      <motion.div variants={frameVariants} className="relative aspect-[4/3] overflow-hidden bg-[#ede7dc]">
        <motion.div variants={pictureVariants} className="absolute inset-0">
          {!imgFailed ? (
            <Image
              src={causeItem.image}
              alt={causeItem.imageAlt || ""}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              onError={() => setImgFailed(true)}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]
                         motion-reduce:transition-none"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
          )}
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
        {causeItem.category && (
          <span className="absolute bottom-4 left-4 border border-black/10 bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#141714] shadow-xs backdrop-blur-md">
            {causeItem.category}
          </span>
        )}
      </motion.div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[28px] font-bold leading-[1.15] text-[#141714] transition-colors group-hover:text-[#e0503a]">
          {causeItem.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-[#505750]">{causeItem.description}</p>

        {/* Progress */}
        {goal > 0 && (
          <div className="mt-6 border-t border-[#ede7dc] pt-5">
            <div className="mb-2 flex items-end justify-between">
              <p className="text-[#141714]">
                <span className="font-['Cormorant_Garamond',Georgia,serif] text-[24px] font-bold leading-none">
                  <CountUp value={raised} format={(n) => money.format(Math.round(n))} />
                </span>
                <span className="ml-1.5 text-xs font-medium text-[#737a73]">raised</span>
              </p>
              <p className="text-xs font-bold text-[#e0503a]">
                <CountUp value={pct} format={(n) => `${Math.round(n)}%`} />
              </p>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-label={`${causeItem.title} funding progress`}
              className="h-2 w-full overflow-hidden rounded-full bg-[#ede7dc]"
            >
              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: pct / 100, transition: { duration: 1.8, ease, delay: 0.5 } },
                }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#e0503a] to-[#f06f5b]"
              />
            </div>

            <p className="mt-2 text-xs text-[#737a73]">Goal: {money.format(goal)}</p>
          </div>
        )}

        {causeItem.linkTo && (
          <Link
            href={causeItem.linkTo}
            className="group/btn relative mt-6 inline-flex items-center gap-3 self-start border-b-2 border-[#e0503a] pb-1 text-xs font-bold uppercase tracking-wider text-[#141714] transition-colors hover:text-[#e0503a]"
          >
            <span>{causeItem.linkText || "View cause"}</span>
            <ArrowUpRight size={14} className="text-[#e0503a] transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
