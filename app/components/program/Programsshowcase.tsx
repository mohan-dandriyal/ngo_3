"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProgramItem } from "@/app/types/program";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";
import CountUp from "@/app/components/program/Countup";

interface ProgramsShowcaseData {
  eyebrow?: string;
  titleStart?: string;
  titleAccent?: string;
  description?: string;
}

interface ProgramsShowcaseProps {
  data: ProgramsShowcaseData;
  programs: ProgramItem[];
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const frame: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: [0.7, 0, 0.2, 1] } },
};
const picture: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 2, ease } },
};
const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease } },
};

function ProgramRow({ program, flip, reduce }: { program: ProgramItem; flip: boolean; reduce: boolean | null }) {
  const [imgFailed, setImgFailed] = useState(!program.image);
  const programLink = program as ProgramItem & { linkText?: string; linkTo?: string };

  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -36, reduce ? 0 : 36]);

  return (
    <motion.article
      id={program.id}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative scroll-mt-28 py-16 first:pt-8"
    >
      {/* Divider */}
      <motion.span
        variants={rule}
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#141714]/15"
      />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <motion.div
          ref={frameRef}
          variants={frame}
          className={`relative aspect-[4/5] w-full overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_12px_30px_-10px_rgba(20,24,20,0.08)] sm:aspect-[5/4] lg:aspect-[4/5] ${flip ? "lg:order-2" : ""}`}
        >
          {!imgFailed && program.image ? (
            <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y }}>
              <motion.div variants={picture} className="absolute inset-0">
                <Image
                  src={program.image}
                  alt={program.imageAlt || ""}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  onError={() => setImgFailed(true)}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
          )}
          {program.category && (
            <span className="absolute bottom-5 left-5 border border-black/10 bg-white/95 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#141714] shadow-xs backdrop-blur-md">
              {program.category}
            </span>
          )}
        </motion.div>

        {/* Content */}
        <div className={flip ? "lg:order-1" : ""}>
          <motion.p variants={fadeUp} className="flex items-baseline gap-4">
            {program.number && (
              <span className="font-['Cormorant_Garamond',Georgia,serif] text-[clamp(56px,6vw,96px)] font-bold italic leading-none text-[#e0503a]">
                {program.number}
              </span>
            )}
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-4 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[#141714] text-[clamp(36px,4vw,60px)] font-bold leading-[1.05] tracking-[-0.015em]"
          >
            {program.title}
          </motion.h3>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[16px] leading-[1.85] text-[#4e554e]">
            {program.description}
          </motion.p>

          {/* Results */}
          {program.stats && program.stats.length > 0 && (
            <motion.dl variants={fadeUp} className="mt-8 grid grid-cols-2 gap-6 border-y border-[#141714]/15 py-6 text-[#141714]">
              {program.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[13px] font-medium leading-snug text-[#737a73]">{s.label}</dt>
                  <dd className="m-0 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(36px,3.8vw,54px)] font-bold leading-none tracking-[-0.02em] text-[#141714]">
                    {s.prefix}
                    <CountUp value={s.value} plain={s.plain} />
                    {s.suffix && <span className="text-[#e0503a]">{s.suffix}</span>}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}

          {/* What we do */}
          {program.highlights && program.highlights.length > 0 && (
            <ul className="mt-7 space-y-3">
              {program.highlights.map((h) => (
                <motion.li key={h} variants={fadeUp} className="flex items-start gap-3.5 text-[15px] leading-[1.65] text-[#444c44]">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-[#e0503a]" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {programLink.linkText && (
            <motion.div variants={fadeUp} className="mt-9">
              <Link
                href={programLink.linkTo || "#"}
                className="group relative inline-flex items-center gap-3 pb-2 text-sm font-semibold tracking-[0.02em] text-[#141714] transition-colors hover:text-[#e0503a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
              >
                {programLink.linkText}
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-[#e0503a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProgramsShowcase({ data, programs = [] }: ProgramsShowcaseProps) {
  const { eyebrow, titleStart, titleAccent, description } = data ?? ({} as ProgramsShowcaseData);
  const reduce = useReducedMotion();

  return (
    <section
      id="programs"
      className="w-full overflow-hidden bg-[#faf8f5] text-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="pb-16 pt-20 lg:pb-20 lg:pt-20">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-16"
          >
            <div>
              {eyebrow && <Eyebrow eyebrow={eyebrow} tone="light" />}
              <SectionTitle titleStart={titleStart} titleAccent={titleAccent} tone="light" />
            </div>
            {description && (
              <div className="lg:pb-3">
                <Description description={description} variant="body" tone="light" />
              </div>
            )}
          </motion.div>

          <div className="mt-12 lg:mt-16">
            {programs.map((p, i) => (
              <ProgramRow key={p.id} program={p} flip={i % 2 === 1} reduce={reduce} />
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
