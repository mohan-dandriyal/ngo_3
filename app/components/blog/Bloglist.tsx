"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Search } from "lucide-react";
import type { BlogListLabels, BlogPost } from "@/app/types/blog";
import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import BlogPostCard from "@/app/components/blog/Blogpostcard";

interface BlogListProps {
  posts: BlogPost[];
  labels: BlogListLabels;
  readText?: string;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function BlogList({ posts, labels, readText }: BlogListProps) {
  const reduce = useReducedMotion();
  const pageSize = labels.pageSize ?? 6;

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(pageSize);

  const categories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      const inSearch =
        !q || [p.title, p.excerpt, p.category, ...(p.tags ?? [])].join(" ").toLowerCase().includes(q);
      return inCategory && inSearch;
    });
  }, [posts, category, query]);

  const visible = filtered.slice(0, count);

  const pickCategory = (c: string) => {
    setCategory(c);
    setCount(pageSize);
  };

  return (
    <section
      id="stories"
      className="w-full overflow-hidden bg-[#faf8f5] py-20 text-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div>
          {/* Heading */}
          {(labels.eyebrow || labels.titleStart) && (
            <motion.div
              variants={container}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12"
            >
              {labels.eyebrow && <Eyebrow eyebrow={labels.eyebrow} tone="light" />}
              {labels.titleStart && (
                <SectionTitle titleStart={labels.titleStart} titleAccent={labels.titleAccent} tone="light" />
              )}
            </motion.div>
          )}

          {/* Grid */}
          <motion.div
            layout
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <BlogPostCard
                  key={p.slug || p.id}
                  post={p}
                  tone="light"
                  readText={readText}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length > count && (
            <motion.div variants={fadeUp} className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setCount((c) => c + pageSize)}
                className="inline-flex items-center gap-3 border border-[#141714]/20 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141714] shadow-xs transition-colors hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-white"
              >
                {labels.loadMoreText || "Load more stories"}
              </button>
            </motion.div>
          )}

          {filtered.length === 0 && (
            <p role="status" className="mt-12 text-center text-lg text-[#737a73]">
              {labels.emptyText}
            </p>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
