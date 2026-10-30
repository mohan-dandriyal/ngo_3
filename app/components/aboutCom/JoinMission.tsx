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
import type { JoinMission as JoinMissionType } from "@/app/types/about";
import MainContainer from "../ui/MainContainer";
import { Description, SectionTitle } from "../ui/SectionContent";

interface JoinMissionProps {
  data: JoinMissionType;
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
const ruleLeft: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};
const frame: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: [0.7, 0, 0.2, 1] } },
};
const picture: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 2, ease } },
};
const caption: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.8 } },
};

function Marquee({ text, reduce }: { text: string; reduce: boolean | null }) {
  const row = (key: string) => (
    <div key={key} aria-hidden="true" className="flex flex-none items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(36px,5.4vw,80px)] font-medium italic leading-none text-[#141714]/80">
            {text}
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0503a]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-[#141714]/15 py-7">
      <p className="sr-only">{text}</p>
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row("a")}
        {row("b")}
      </motion.div>
    </div>
  );
}

export default function JoinMission({ data }: JoinMissionProps) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    description,
    image,
    imageCaption,
    primaryButton,
    bottomNote,
    footerText,
  } = data ?? ({} as JoinMissionType);

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -44, reduce ? 0 : 44]);

  return (
    <section
      id="join-our-mission"
      className="relative w-full overflow-hidden bg-[#faf8f5] py-20 text-[#141714] sm:py-24 md:py-28
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      {/* Background glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] max-w-full -translate-x-1/2 rounded-full
                   bg-[#e0503a]/[0.06] blur-[140px]"
        animate={reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <MainContainer>
        {/* Heading and calls to action */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative max-w-5xl text-left"
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-6 flex items-center justify-start gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#2a5c43]"
            >
              <motion.span variants={ruleLeft} aria-hidden="true" className="h-px w-8 origin-left bg-[#2a5c43]" />
              {eyebrow}
            </motion.p>
          )}

          <SectionTitle
            titleStart={titleStart}
            titleAccent={titleAccent}
            tone="light"
            className="text-left !text-[clamp(44px,7vw,76px)] !leading-[1.02]"
          />

          {description && (
            <div className="mt-6 max-w-[36rem] text-left">
              <Description description={description} variant="body" tone="light" />
            </div>
          )}
        </motion.div>

        {/* Scrolling closing line */}
        {bottomNote && (
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 sm:mt-20"
          >
            <Marquee text={bottomNote} reduce={reduce} />
          </motion.div>
        )}

        {/* Image banner */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 sm:mt-16"
        >
          <motion.div
            ref={frameRef}
            variants={frame}
            className="relative h-[280px] overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_16px_40px_-16px_rgba(20,24,20,0.1)] sm:h-[360px] md:h-[420px] lg:h-[460px]"
          >
            {!imgFailed && image?.src ? (
              <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
                <motion.div variants={picture} className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    onError={() => setImgFailed(true)}
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
            )}

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
              aria-hidden="true"
            />

            {(imageCaption || primaryButton?.link) && (
              <motion.div
                variants={caption}
                className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-8 md:p-10"
              >
                {imageCaption && (
                  <p className="max-w-xl font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-medium leading-snug text-white sm:text-3xl md:text-4xl">
                    {imageCaption}
                  </p>
                )}

                {primaryButton?.link && (
                  <Link
                    href={primaryButton.link}
                    aria-label={primaryButton.text || "Get involved"}
                    className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/60
                               text-white outline-none transition-colors duration-300
                               hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-white
                               focus-visible:ring-2 focus-visible:ring-[#e0503a]"
                  >
                    <ArrowUpRight
                      size={21}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {footerText && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-10 max-w-2xl text-center font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[22px] italic leading-snug text-[#525a52] sm:text-[26px]"
            >
              {footerText}
            </motion.p>
          )}
        </motion.div>
      </MainContainer>
    </section>
  );
}
