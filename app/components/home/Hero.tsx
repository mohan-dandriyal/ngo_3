"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { HeroContent } from "@/app/types/home";
import { Description, Eyebrow } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Copy column: children enter one after another */
const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

/* Generic fade and rise for eyebrow, description and buttons */
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/* Title: each line slides up out of its own mask */
const titleContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const titleLine: Variants = {
  hidden: { y: "105%" },
  show: { y: 0, transition: { duration: 1.1, ease } },
};

export default function Hero({ data }: HeroContent) {
  const { eyebrow, titleLight, titleAccent, description, primaryBtn, secondaryBtn, image, badge } = data;
  const [imgFailed, setImgFailed] = useState(!image?.src);

  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle parallax: the image column drifts slower than the page
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a09] w-full
                 bg-[radial-gradient(40%_30%_at_100%_0%,#1c2a22_0%,transparent_70%)]
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      {/* Soft red glow behind the image, slowly breathing */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full
                   bg-[#e0503a]/20 blur-[120px]"
        animate={reduce ? undefined : { opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <MainContainer>
        <div
          className="relative mx-auto grid items-center gap-12 px-5 py-12 sm:px-8
                   lg:grid-cols-[1.45fr_1fr] lg:gap-16 lg:py-6 lg:pl-14 lg:pr-[74px]"
        >
          {/* Copy */}
          <motion.div
            className="py-6 lg:py-16"
            variants={copyContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            {eyebrow && (
              <motion.div variants={rise}>
                <Eyebrow eyebrow={eyebrow} />
              </motion.div>
            )}

            <motion.h1
              variants={titleContainer}
              className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(60px,9.4vw,100px)]
                       font-medium leading-[0.98] mb-4 tracking-[-0.02em]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={titleLine} className="block text-[#ece6da]">
                  {titleLight}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={titleLine} className="block text-[#e0503a]">
                  {titleAccent}
                </motion.span>
              </span>
            </motion.h1>

            <motion.div variants={rise}>
              <Description description={description} />
            </motion.div>

            <motion.div variants={rise} className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-5">
              {primaryBtn?.text && (
               <PrimaryButton href={primaryBtn.linkTo}>
                  {primaryBtn.text}
                </PrimaryButton>
              )}
              {secondaryBtn?.text && (
                <Link
                  href={secondaryBtn.linkTo || "#"}
                  className="group relative inline-flex items-center gap-2.5 pb-1.5 text-[15px] text-[#ece6da]
                           transition-colors hover:text-white
                           after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[#bdb7aa]/50
                           before:absolute before:bottom-0 before:left-0 before:z-10 before:h-px before:w-full before:origin-left
                           before:scale-x-0 before:bg-[#e9a26b] before:transition-transform before:duration-500
                           hover:before:scale-x-100
                           focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                >
                  {secondaryBtn.text}
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                    <path d="M3 3l6 6M9 3.5V9H3.5" />
                  </svg>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Image card */}
          <motion.div className="relative" style={{ y: imageY }}>
            <motion.figure
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1], delay: 0.25 }}
              className="group relative m-0 aspect-[4/5] w-full overflow-hidden bg-[#161a17]
                       ring-1 ring-[#e8c99a]/15 lg:aspect-[585/730]"
            >
              {!imgFailed && (
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.18 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.4, ease, delay: 0.25 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    onError={() => setImgFailed(true)}
                    className="object-cover transition-transform duration-[1400ms] ease-out
                             group-hover:scale-[1.05] motion-reduce:transition-none"
                  />
                </motion.div>
              )}
              {imgFailed && (
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />

              {/* Caption */}
              <motion.figcaption
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.5 }}
                className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[11px] font-medium
                         uppercase tracking-[0.12em] text-[#ece6da]"
              >
                <span>{image?.counter}</span>
                <span>{image?.location}</span>
              </motion.figcaption>
            </motion.figure>

            {/* Badge sits outside the figure so the reveal mask does not clip it */}
            {badge && (
              <motion.div
                className="absolute -left-9 bottom-14 z-10"
                initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1.3 }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
                  whileHover={{ scale: 1.06 }}
                  className="flex h-[150px] w-[150px] flex-col justify-center rounded-full bg-[#e0503a]
                           pl-[62px] pr-4 text-[#14110c] shadow-[0_18px_40px_-14px_rgba(224,80,58,0.65)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true" className="mb-3 h-6 w-6">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 17V8M8 11.5l4-4 4 4" />
                  </svg>
                  <span className="block max-w-[5.5rem] -rotate-[14deg] origin-left font-['Cormorant_Garamond',Georgia,serif]
                                 text-[15px] font-semibold leading-[1.15]">
                    {badge}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}