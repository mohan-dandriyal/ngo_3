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

          {/* Toolbar: category chips and search */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div role="group" aria-label="Filter stories by category" className="flex flex-wrap gap-2.5">
              {["all", ...categories].map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => pickCategory(c)}
                    className={`relative rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider outline-none transition-all duration-300
                      ${active
                        ? "bg-[#e0503a] text-white shadow-xs"
                        : "border border-[#141714]/15 bg-white text-[#141714] hover:border-[#e0503a] hover:text-[#e0503a]"
                      }`}
                  >
                    <span>{c === "all" ? labels.allLabel : c}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="blog-search" className="sr-only">
                {labels.searchLabel}
              </label>
              <Search size={16} aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737a73]" />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCount(pageSize);
                }}
                placeholder={labels.searchPlaceholder}
                className="w-full rounded-full border border-[#e5dfd5] bg-white py-2.5 pl-10 pr-4 text-sm text-[#141714] shadow-xs outline-none transition-colors placeholder:text-[#737a73] focus:border-[#e0503a]"
              />
            </div>
          </motion.div>

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
