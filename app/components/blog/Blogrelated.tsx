"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogLabels, BlogPost } from "@/app/types/blog";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import BlogPostCard from "@/app/components/blog/Blogpostcard";

interface BlogRelatedProps {
  posts: BlogPost[];
  labels: BlogLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow and SectionTitle join the stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function BlogRelated({ posts, labels }: BlogRelatedProps) {
  const reduce = useReducedMotion();
  if (posts.length === 0) return null;

  return (
    <section
      id="related"
      className="w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(40%_30%_at_0%_100%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="py-20 lg:py-[120px]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow eyebrow={labels.relatedEyebrow} />
              <SectionTitle titleStart={labels.relatedTitleStart} titleAccent={labels.relatedTitleAccent} />
            </div>

            <motion.div variants={fadeUp} className="lg:pb-3">
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.02em] text-[#ece6da]
                           focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
              >
                {labels.relatedLinkText}
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                />
              </Link>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogPostCard key={p.slug} post={p} tone="dark" readText={labels.readText} />
            ))}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}