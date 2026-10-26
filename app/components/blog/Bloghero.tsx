
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogHeroData, BlogPost } from "@/app/types/blog";
import { formatDate } from "@/app/lib/blog-utils";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface BlogHeroProps {
  data: BlogHeroData;
  latest?: BlogPost;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow and Description join the same stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease } },
};

function Words({ text }: { text: string }) {
  return (
    <>
      {text
        .split(" ")
        .filter(Boolean)
        .map((w, i) => (
          <span
            key={`${w}-${i}`}
            aria-hidden="true"
            className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-bottom"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
    </>
  );
}

export default function BlogHero({ data, latest }: BlogHeroProps) {
  const { eyebrow, breadcrumb, titleStart, titleAccent, description, latestLabel } = data ?? ({} as BlogHeroData);
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!latest?.image);

  return (
    <section
      id="blog-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_0%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20 "
        >
          <div>
            {breadcrumb && <BreadCrumb breadcrumb={breadcrumb} />}
            {eyebrow && <Eyebrow eyebrow={eyebrow} />}

            <motion.h1
              variants={headline}
              aria-label={`${titleStart} ${titleAccent}`}
              className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(54px,8vw,100px)]
                         font-medium leading-[0.98] tracking-[-0.02em] text-[#ece6da]"
            >
              <Words text={titleStart} />
              <em className="font-medium italic text-[#e0503a]">
                <Words text={titleAccent} />
              </em>
            </motion.h1>

            {description && (
              <div className="mt-8">
                <Description description={description} variant="body" />
              </div>
            )}
          </div>

          {/* Latest story */}
          {latest && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.4 } },
              }}
            >
              <Link
                href={`/blog/${latest.slug}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15">
                  {!imgFailed && latest.image ? (
                    <Image
                      src={latest.image}
                      alt={latest.imageAlt || ""}
                      fill
                      priority
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      onError={() => setImgFailed(true)}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    {latestLabel && (
                      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#e9a26b]">
                        <span className="h-px w-8 bg-[#e9a26b]" aria-hidden="true" />
                        {latestLabel}
                      </p>
                    )}
                    <h2 className="mt-4 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.1] text-[#ece6da]">
                      {latest.title}
                    </h2>
                    <p className="mt-4 flex items-center justify-between text-[13px] text-[#bdb7aa]">
                      <span>
                        {latest.category}
                        <span className="mx-2 text-[#e8c99a]/50">/</span>
                        <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[#ece6da]/40 text-[#ece6da] transition-colors duration-300 group-hover:border-[#e0503a] group-hover:bg-[#e0503a] group-hover:text-[#14110c]">
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </MainContainer>
    </section>
  );
}