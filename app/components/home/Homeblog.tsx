"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FeaturedPost, PostRow } from "@/app/components/ui/Blogcard";
import { HomeBlogContent } from "@/app/types/home";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import Link from "next/link";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const headingContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

export default function HomeBlog({ data }: HomeBlogContent) {
  const { eyebrow, titleStart, titleAccent, titleEnd, linkText, linkTo, posts } =
    data ?? ({} as HomeBlogContent["data"]);
  const reduce = useReducedMotion();

  const [featured, ...rest] = Array.isArray(posts) ? posts : [];
  const list = rest.slice(0, 3);

  return (
    <section
      id="blog"
      className="overflow-hidden py-30 bg-[radial-gradient(40%_30%_at_0%_100%,#1c2a22_0%,transparent_70%)]
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      <MainContainer>
        <div className="mx-auto ">
          {/* Heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              {eyebrow && (
                <Eyebrow eyebrow={eyebrow} />
              )}

              <SectionTitle
                titleStart={titleStart}
                titleAccent={titleAccent}
                titleEnd={titleEnd}
                tone={'dark'}
              />
            </div>

            {linkText && (
              <motion.div variants={rise} className="lg:pb-3">
                <Link
                  href={linkTo || "#"}
                  className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#ece6da]
                          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                >
                  {linkText}
                  <svg
                    viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M3 11L11 3M4.5 3H11v6.5" />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                  />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Lead story and recent posts */}
          {featured && (
            <motion.div
              variants={grid}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
              className="mt-14 grid items-start gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20"
            >
              <FeaturedPost post={featured} />

              {list.length > 0 && (
                <div className="flex flex-col">
                  {list.map((p, i) => (
                    <PostRow key={i} post={p} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}