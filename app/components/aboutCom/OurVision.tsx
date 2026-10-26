"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Vision } from "@/app/types/about";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

interface OurVisionProps {
  data: Vision;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/*
  Variant names are "hidden" and "show" so Eyebrow, SectionTitle and Description
  (from SectionContent) join the same stagger.
*/
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const line: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease } },
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.9 } },
};

export default function OurVision({ data }: OurVisionProps) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    description,
    linkText,
    linkTo,
    image,
    tag,
    imageCaption,
    highlights = [],
  } = data ?? ({} as Vision);

  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(!image?.src);

  return (
    <section
      id="our-vision"
      className="w-full overflow-hidden bg-[#0a0a09] pb-20 lg:pb-28 text-[#ece6da] 
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Vision content */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-6"
          >
            {eyebrow && <Eyebrow eyebrow={eyebrow} />}

            <SectionTitle titleStart={titleStart} titleAccent={titleAccent} />

            {description && (
              <div className="mt-7">
                <Description description={description} variant="body" />
              </div>
            )}

            {linkText && (
              <motion.div variants={fadeUp} className="mt-7">
                <Link
                  href={linkTo || "#"}
                  className="group relative inline-flex items-center gap-3 pb-2 text-sm text-[#ece6da]
                             transition-colors hover:text-white
                             focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                >
                  {linkText}
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  {/* Underline thickens on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                  />
                </Link>
              </motion.div>
            )}

            {/* Vision highlights */}
            {highlights.length > 0 && (
              <div className="mt-12">
                {highlights.map((item) => (
                  <motion.div
                    key={item.number ?? item.title}
                    variants={fadeUp}
                    className="group relative grid grid-cols-[42px_1fr] gap-4 py-5 sm:py-6"
                  >
                    {/* Divider draws across */}
                    <motion.span
                      variants={line}
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-px w-full origin-left bg-[#ece6da]/20"
                    />

                    {item.number && (
                      <span className="pt-1 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-lg italic text-[#e0503a]">
                        {item.number}
                      </span>
                    )}

                    <div className={item.number ? "" : "col-span-2"}>
                      <h3
                        className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-xl transition-all duration-300
                                   group-hover:translate-x-1.5 group-hover:text-[#e0503a] sm:text-2xl"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#bdb7aa]">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Vision image */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:sticky lg:top-24 lg:col-span-6"
          >
            <motion.div
              variants={frame}
              className="group relative min-h-[380px] overflow-hidden bg-[#202820] ring-1 ring-[#e8c99a]/15
                         sm:min-h-[520px] lg:min-h-[650px]"
            >
              {!imgFailed && image?.src ? (
                <motion.div variants={picture} className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImgFailed(true)}
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]
                               motion-reduce:transition-none"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />

              {(tag || imageCaption) && (
                <motion.div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
                  {tag && (
                    <p className="text-xs uppercase tracking-[0.22em] text-[#ece6da]/80">{tag}</p>
                  )}
                  {imageCaption && (
                    <p className="mt-3 max-w-md font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-3xl leading-tight text-[#ece6da] sm:text-4xl">
                      {imageCaption}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}