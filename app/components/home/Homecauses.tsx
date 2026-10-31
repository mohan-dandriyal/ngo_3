"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
} from "lucide-react";

import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

type HomeCauseItem = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  linkText: string;
  linkTo: string;
  donateTo: string;
  fundsUse?: string;
  fundraising?: {
    raised: number;
    goal: number;
    currency: string;
  };
};

type HomeCausesContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent?: string;
    titleEnd?: string;
    description?: string;
    linkText?: string;
    linkTo?: string;
    donateButtonText: string;
    fundsUseLabel?: string;
    raisedLabel?: string;
    targetLabel?: string;
    fundedLabel?: string;
    causes?: HomeCauseItem[];
  };
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const grid: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function CauseCard({
  cause,
  donateButtonText,
  labels,
}: {
  cause: HomeCauseItem;
  donateButtonText: string;
  labels?: {
    fundsUseLabel?: string;
    raisedLabel?: string;
    targetLabel?: string;
    fundedLabel?: string;
  };
}) {
  const fundraising = cause.fundraising;

  const hasFundraising =
    typeof fundraising?.raised === "number" &&
    typeof fundraising?.goal === "number" &&
    fundraising.goal > 0 &&
    !!fundraising.currency;

  const progress = hasFundraising
    ? Math.min(
        100,
        Math.max(
          0,
          (fundraising.raised / fundraising.goal) * 100
        )
      )
    : 0;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease }}
      className="group flex h-full flex-col overflow-hidden rounded-xs border border-[#e5dfd5] bg-white shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-300 hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]"
    >
      {/* Image */}
      <Link
        href={cause.linkTo}
        aria-label={`${cause.linkText}: ${cause.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#ede7dc]"
      >
        <Image
          src={cause.image}
          alt={cause.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />

        {/* Category */}
        <span className="absolute left-4 top-4 border border-black/10 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#141714] shadow-xs backdrop-blur-md">
          {cause.category}
        </span>

        {/* Image arrow */}
        <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white transition-all duration-300 group-hover:border-[#e0503a] group-hover:bg-[#e0503a] group-hover:text-white">
          <ArrowUpRight size={16} />
        </span>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Title */}
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-bold leading-tight text-[#141714] transition-colors duration-300 group-hover:text-[#e0503a] sm:text-[26px]">
          {cause.title}
        </h3>

        {/* Description */}
        <p className="mt-3.5 min-h-[68px] text-[14px] leading-[1.8] text-[#4d544d]">
          {cause.description}
        </p>

        {/* Where donations go */}
        {cause.fundsUse && (
          <div className="mt-4 rounded-r border-l-2 border-[#2a5c43] bg-[#2a5c43]/[0.04] py-2 pl-3.5 pr-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2a5c43]">
              {labels?.fundsUseLabel || "Where your gift goes"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#414841]">
              {cause.fundsUse}
            </p>
          </div>
        )}

      

        {/* Card actions */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#ede7dc] pt-5">
          <Link
            href={cause.linkTo}
            className="group/read inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#141714] transition-colors hover:text-[#e0503a]"
          >
            {cause.linkText}
            <ArrowUpRight
              size={14}
              className="text-[#e0503a] transition-transform group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeCauses({ data }: HomeCausesContent) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd,
    description,
    linkText,
    linkTo,
    donateButtonText,
    causes = [],
  } = data;

  const reduce = useReducedMotion();

  return (
    <section
      id="causes"
      className="relative overflow-hidden bg-[#faf8f5] py-16 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#141714] sm:py-16 lg:py-16"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[#e0503a]/[0.03] blur-[130px]"
      />

      <MainContainer>
        <div className="relative">
          {/* Section heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12"
          >
            <div className="max-w-[700px]">
              {eyebrow && (
                <motion.div variants={rise} className="mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </motion.div>
              )}

              <motion.div variants={rise}>
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="light"
                />
              </motion.div>
            </div>

            <div className="max-w-[420px] lg:pb-3">
              {description && (
                <motion.p
                  variants={rise}
                  className="text-sm leading-7 text-[#525a52] sm:text-base sm:leading-8"
                >
                  {description}
                </motion.p>
              )}

              {linkText && (
                <motion.div
                  variants={rise}
                  className="mt-6"
                >
                  <Link
                    href={linkTo || "/our-cause"}
                    className="group inline-flex items-center gap-3 border-b-2 border-[#e0503a] pb-1.5 text-sm font-semibold text-[#141714] transition-colors hover:text-[#e0503a]"
                  >
                    {linkText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Causes cards grid */}
          {causes.length > 0 && (
            <motion.div
              variants={grid}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
            >
              {causes.map((cause) => (
                <CauseCard
                  key={cause.id}
                  cause={cause}
                  donateButtonText={donateButtonText}
                  labels={{
                    fundsUseLabel: data.fundsUseLabel,
                    raisedLabel: data.raisedLabel,
                    targetLabel: data.targetLabel,
                    fundedLabel: data.fundedLabel,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
