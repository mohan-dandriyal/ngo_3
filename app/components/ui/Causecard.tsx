"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Variant names match the parent grid, so its stagger drives each card */
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




/* Numbers count up the first time they scroll into view */
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
      className="group flex flex-col overflow-hidden border border-[#14110c]/10 bg-[#161a17]
                 transition-shadow duration-500 hover:shadow-[0_30px_50px_-28px_rgba(20,17,12,0.5)]"
    >
      {/* Image */}
      <motion.div variants={frameVariants} className="relative aspect-[4/3] overflow-hidden bg-[#161a17]">
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
            <div className="h-full w-full bg-[linear-gradient(160deg,#3b7a68,#0a0a09)]" aria-hidden="true" />
          )}
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        {causeItem.category && (
          <span className="absolute bottom-4 left-4 bg-[#0a0a09] px-3.5 py-2 text-[13px] font-medium tracking-[0.02em] text-[#e8c99a]">
            {causeItem.category}
          </span>
        )}
      </motion.div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 pb-9 pt-8">
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[32px] font-medium leading-[1.1] text-[#efefef]">
          {causeItem.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[#bdbdbd]">{causeItem.description}</p>

        {/* Progress */}
        {goal > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-end justify-between">
              <p className="text-[#14110c]">
                <span className="font-['Cormorant_Garamond',Georgia,serif] text-[28px] font-semibold leading-none">
                  <CountUp value={raised} format={(n) => money.format(Math.round(n))} />
                </span>
                <span className="ml-2 text-[13px] text-[#5a544c]">raised</span>
              </p>
              <p className="text-[13px] font-medium text-[#3f6b57]">
                <CountUp value={pct} format={(n) => `${Math.round(n)}%`} />
              </p>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-label={`${causeItem.title} funding progress`}
              className="h-[6px] w-full overflow-hidden bg-[#14110c]/10"
            >
              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: pct / 100, transition: { duration: 1.8, ease, delay: 0.5 } },
                }}
                className="h-full w-full origin-left bg-[#e0503a]"
              />
            </div>

            <p className="mt-3 text-[13px] text-[#5a544c]">Goal: {money.format(goal)}</p>
          </div>
        )}

        {causeItem.linkTo && (
          <div
            className="group/btn relative mt-8 inline-flex items-center justify-between gap-5 self-start overflow-hidden
               bg-[#14110c] px-6 py-4 text-[15px] font-medium tracking-[0.01em] text-[#f1ece1]"
          >
            {/* Hover background */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[#e0503a] transition-transform duration-500 ease-out
                 group-hover/btn:translate-x-0 motion-reduce:transition-none"
            />

            <span className="relative transition-colors duration-300 group-hover/btn:text-[#14110c]">
              {causeItem.linkText || "View cause"}
            </span>

            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="relative h-3.5 w-3.5 transition-all duration-300 group-hover/btn:-translate-y-0.5
                 group-hover/btn:translate-x-0.5 group-hover/btn:text-[#14110c]"
            >
              <path d="M3 11L11 3M4.5 3H11v6.5" />
            </svg>
          </div>
        )}
      </div>
    </motion.article>
  );
}