
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
  Heart,
  ArrowRight,
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
    causes?: HomeCauseItem[];
  };
};



const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

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
      duration: 0.8,
      ease,
    },
  },
};

function formatCurrency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function CauseCard({
  cause,
  donateButtonText,
}: {
  cause: HomeCauseItem;
  donateButtonText: string;
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
      className="group flex h-full flex-col overflow-hidden border border-white/10 bg-[#151915] transition-colors duration-300 hover:border-[#a8c686]/40"
    >
      {/* Image */}
      <Link
        href={cause.linkTo}
        aria-label={`${cause.linkText}: ${cause.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#20251f]"
      >
        <Image
          src={cause.image}
          alt={cause.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {/* Category */}
        <span className="absolute left-5 top-5 border border-white/20 bg-black/45 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
          {cause.category}
        </span>

        {/* Image arrow */}
        <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white transition-all duration-300 group-hover:border-[#a8c686] group-hover:bg-[#a8c686] group-hover:text-[#0a0a09]">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">

        {/* Title */}
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-semibold leading-tight text-[#eee8dc] transition-colors duration-300 group-hover:text-[#a8c686] sm:text-[28px]">
          {cause.title}
        </h3>

        {/* Description */}
        <p className="mt-4 min-h-[76px] text-sm leading-[1.85] text-[#b5b4aa]">
          {cause.description}
        </p>

        {/* Where donations go */}
        {cause.fundsUse && (
          <div className="mt-5 border-l-2 border-[#a8c686]/60 py-1 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a8c686]">
              Where your gift goes
            </p>

            <p className="mt-2 text-xs leading-[1.8] text-[#92958c]">
              {cause.fundsUse}
            </p>
          </div>
        )}

        {/* Optional fundraising details */}
        {hasFundraising && (
          <div className="mt-6 border-t border-white/10 pt-5">

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#92958c]">
                  Raised so far
                </p>

                <p className="mt-1 text-lg font-semibold text-[#eee8dc]">
                  {formatCurrency(
                    fundraising.raised,
                    fundraising.currency
                  )}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#92958c]">
                  Target
                </p>

                <p className="mt-1 text-sm text-[#c7c4b9]">
                  {formatCurrency(
                    fundraising.goal,
                    fundraising.currency
                  )}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label={`${cause.title} fundraising progress`}
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  ease,
                }}
                className="h-full rounded-full bg-[#a8c686]"
              />
            </div>

            <p className="mt-2 text-right text-xs text-[#a8c686]">
              {Math.round(progress)}% funded
            </p>
          </div>
        )}

        {/* Card actions */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-6">

          <Link
            href={cause.linkTo}
            className="group/read inline-flex items-center gap-2 text-xs font-medium text-[#d8d5cb] transition-colors hover:text-[#a8c686]"
          >
            {cause.linkText}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5"
            />
          </Link>

          <Link
            href={cause.donateTo}
            className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#e0503a] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#f06450] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
          >
            <Heart size={14} />
            {donateButtonText}
          </Link>

        </div>
      </div>
    </motion.article>
  );
}

export default function HomeCauses({
  data,
}: HomeCausesContent) {
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
      className="relative overflow-hidden bg-[#0a0a09] py-20 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#ece6da] sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[#a8c686]/[0.04] blur-[130px]"
      />

      <MainContainer>
        <div className="relative mx-auto">

          {/* Section heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="grid items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-20"
          >
            <div>
              {eyebrow && (
                <motion.div variants={rise}>
                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              <motion.div variants={rise}>
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="dark"
                />
              </motion.div>
            </div>

            <div className="max-w-[430px] lg:pb-3">
              {description && (
                <motion.p
                  variants={rise}
                  className="text-sm leading-[2] text-[#aaa99f] sm:text-base"
                >
                  {description}
                </motion.p>
              )}

              {linkText && linkTo && (
                <motion.div
                  variants={rise}
                  className="mt-7"
                >
                  <Link
                    href={linkTo}
                    className="group inline-flex items-center gap-3 border-b border-[#e0503a]/60 pb-2 text-sm text-[#ece6da] transition-colors hover:border-[#a8c686] hover:text-[#a8c686]"
                  >
                    {linkText}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Causes grid */}
          {causes.length > 0 && (
            <motion.div
              variants={grid}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.12,
              }}
              className="mt-12 grid items-stretch gap-6 sm:mt-16 md:grid-cols-2 xl:grid-cols-3"
            >
              {causes.map((cause) => (
                <CauseCard
                  key={cause.id}
                  cause={cause}
                  donateButtonText={donateButtonText}
                />
              ))}
            </motion.div>
          )}

        </div>
      </MainContainer>
    </section>
  );
}
