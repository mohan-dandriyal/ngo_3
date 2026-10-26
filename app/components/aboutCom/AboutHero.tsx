"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { AboutHeroContent } from "@/app/types/about";
import { Description, Eyebrow } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";
import BreadCrumb from "../ui/BreadCrumb";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Page-load sequence: plays as soon as the page opens */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease } },
};
const statsVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, staggerChildren: 0.1, delayChildren: 0.2 } },
};
const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function Words({ text, className = "" }: { text: string; className?: string }) {
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
            <motion.span variants={word} className={`inline-block ${className}`}>
              {w}
            </motion.span>
          </span>
        ))}
    </>
  );
}

/* Number counts up the first time it is visible */
function CountUp({ value, plain = false }: { value: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.2, 0.8, 0.15, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const rounded = Math.round(display);
  return <span ref={ref}>{plain ? String(rounded) : new Intl.NumberFormat("en-IN").format(rounded)}</span>;
}

export default function AboutHero({ data }: AboutHeroContent) {
  const { breadcrumb = [], eyebrow, titleStart, titleAccent, description, linkText, linkTo, image, stats = [] } =
    data ?? ({} as AboutHeroContent["data"]);

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  // The picture drifts slowly inside its frame as the page scrolls
  const frameRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -48, reduce ? 0 : 48]);

  return (
    <section
      className="w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(40%_40%_at_100%_0%,#1c2a22_0%,transparent_70%)]
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className=" pt-10 lg:pt-14"
        >
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <BreadCrumb breadcrumb={breadcrumb} />
          )}

          {/* Title and intro */}
          <div className="grid items-end gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <div>
              {eyebrow && <Eyebrow eyebrow={eyebrow} />}

              <motion.h1
                variants={headline}
                aria-label={`${titleStart} ${titleAccent}`}
                className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(56px,8.6vw,100px)]
                           font-medium leading-[0.98] tracking-[-0.02em] text-[#ece6da]"
              >
                <Words text={titleStart} />
                <em className="font-medium italic text-[#e0503a]">
                  <Words text={titleAccent} />
                </em>
              </motion.h1>
            </div>

            <div className="max-w-[26rem] lg:pb-4">
              <Description description={description} variant="body" />
              {linkText && (
                <motion.div variants={fade} className="mt-8">
                  <a
                    href={linkTo || "#"}
                    className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#ece6da]
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                  >
                    {linkText}
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5">
                      <path d="M7 2v9.5M3 7.5l4 4 4-4" />
                    </svg>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                    />
                  </a>
                </motion.div>
              )}
            </div>
          </div>

          {/* Wide image */}
          <motion.figure
            ref={frameRef}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.5 }}
            className="relative m-0 mt-14 aspect-[4/3] w-full overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15
                       sm:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]"
          >
            {!imgFailed && image?.src ? (
              <motion.div className="absolute inset-x-0 -top-[12%] h-[124%]" style={{ y: imageY }}>
                <Image
                  src={image.src}
                  alt={image.alt || ""}
                  fill
                  priority
                  sizes="(min-width: 1600px) 1600px, 100vw"
                  onError={() => setImgFailed(true)}
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          </motion.figure>

          {/* Stats strip overlaps the bottom of the image */}
          {stats.length > 0 && (
            <motion.dl
              variants={statsVariants}
              className="relative z-10 -mt-10 ml-4 mr-4 grid grid-cols-2 bg-[#e8e1d5] text-[#14110c]
                         shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:ml-8 sm:mr-8 lg:-mt-14 lg:ml-16 lg:mr-16
                         lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={statItem}
                  className={`flex flex-col-reverse justify-end px-6 py-7 lg:px-8 lg:py-9
                              ${i % 2 === 1 ? "border-l border-[#14110c]/15" : ""}
                              ${i >= 2 ? "border-t border-[#14110c]/15 lg:border-t-0" : ""}
                              lg:border-l lg:first:border-l-0`}
                >
                  {/* Label comes first in the markup, the number is shown above it */}
                  <dt className="mt-3 text-[14px] leading-snug text-[#5a544c]">{s.label}</dt>
                  <dd className="m-0 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(40px,4.4vw,64px)] font-medium leading-none tracking-[-0.02em]">
                    {s.prefix}
                    <CountUp value={s.value} plain={s.plain} />
                    {s.suffix && <span className="text-[#e0503a]">{s.suffix}</span>}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          )}
        </motion.div>
      </MainContainer>
    </section>
  );
}