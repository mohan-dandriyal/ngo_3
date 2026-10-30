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
import PrimaryButton from "../ui/PrimaryButton";
import { Description, SectionTitle } from "../ui/SectionContent";

interface JoinMissionProps {
  data: JoinMissionType;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so SectionTitle and Description join the same stagger */
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

/* The closing line scrolls sideways forever; the second row makes the loop seamless */
function Marquee({ text, reduce }: { text: string; reduce: boolean | null }) {
  const row = (key: string) => (
    <div key={key} aria-hidden="true" className="flex flex-none items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(36px,5.4vw,80px)] font-medium italic leading-none text-[#ece6da]/90">
            {text}
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0503a]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-[#ece6da]/15 py-7">
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
    secondaryButton,
    bottomNote,
    footerText,
  } = data ?? ({} as JoinMissionType);

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  // The picture drifts slowly inside its frame while scrolling
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -44, reduce ? 0 : 44]);

  return (
    <section
      id="join-our-mission"
      className="relative w-full overflow-hidden bg-[#0a0a09] py-18 text-[#ece6da] sm:py-18 md:py-20
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      {/* Soft red glow behind the headline, slowly breathing */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] max-w-full -translate-x-1/2 rounded-full
                   bg-[#e0503a]/15 blur-[140px]"
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
          className="relative mx-auto max-w-5xl text-center"
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-8 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e9a26b]"
            >
              <motion.span variants={ruleLeft} aria-hidden="true" className="h-px w-8 origin-right bg-[#e9a26b]" />
              {eyebrow}
              <motion.span variants={ruleLeft} aria-hidden="true" className="h-px w-8 origin-left bg-[#e9a26b]" />
            </motion.p>
          )}

          <SectionTitle
            titleStart={titleStart}
            titleAccent={titleAccent}
            className="text-center !text-[clamp(52px,8vw,80px)] !leading-[0.98]"
          />

          {description && (
            <div className="mx-auto mt-8 max-w-[36rem] text-center">
              <Description description={description} variant="body" />
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
            className="relative h-[300px] overflow-hidden bg-[#202820] ring-1 ring-[#e8c99a]/15 sm:h-[400px] md:h-[500px] lg:h-[560px]"
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
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
            )}

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a09]/80 via-[#0a0a09]/10 to-transparent"
              aria-hidden="true"
            />

            {(imageCaption || primaryButton?.link) && (
              <motion.div
                variants={caption}
                className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-8 md:p-10"
              >
                {imageCaption && (
                  <p className="max-w-xl font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl leading-snug text-[#ece6da] sm:text-3xl md:text-4xl">
                    {imageCaption}
                  </p>
                )}

                {/* The arrow is now a real link to the main action */}
                {primaryButton?.link && (
                  <Link
                    href={primaryButton.link}
                    aria-label={primaryButton.text || "Get involved"}
                    className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ece6da]/50
                               text-[#ece6da] outline-none transition-colors duration-300
                               hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-[#14110c]
                               focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
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
              className="mx-auto mt-10 max-w-2xl text-center font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[22px] italic leading-snug text-[#bdb7aa] sm:text-[26px]"
            >
              {footerText}
            </motion.p>
          )}
        </motion.div>
      </MainContainer>
    </section>
  );
}