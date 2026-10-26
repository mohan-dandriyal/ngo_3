
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

/* Names are "hidden" and "show" so Eyebrow and SectionTitle join the stagger */
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
      className="w-full overflow-hidden bg-[#e8e1d5] text-[#14110c] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="py-20 lg:py-[120px]">
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
                    className={`relative px-5 py-2.5 text-sm font-medium outline-none transition-colors duration-300
                      focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8e1d5]
                      ${active ? "text-[#f1ece1]" : "border border-[#14110c]/20 hover:border-[#14110c]"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="blog-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#14110c]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c === "all" ? labels.allLabel : c}</span>
                  </button>
                );
              })}
            </div>

            <div className="group/search relative w-full lg:max-w-sm">
              <label htmlFor="blog-search" className="sr-only">
                {labels.searchLabel}
              </label>
              <Search size={18} aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 text-[#5a544c]" />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCount(pageSize);
                }}
                placeholder={labels.searchPlaceholder}
                className="w-full bg-transparent py-3 pl-8 text-base text-[#14110c] outline-none placeholder:text-[#5a544c]"
              />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#14110c]/25" />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#e0503a] transition-transform duration-500
                           ease-out group-focus-within/search:scale-x-100"
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
                <BlogPostCard key={p.slug} post={p} readText={readText} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p role="status" className="mt-12 max-w-md text-lg text-[#5a544c]">
              {labels.emptyText}
            </p>
          )}

          {filtered.length > count && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setCount((c) => c + pageSize)}
                className="group relative overflow-hidden border border-[#14110c]/30 px-7 py-[18px] text-[15px] font-semibold
                           text-[#14110c] outline-none transition-colors duration-300 hover:border-[#14110c]
                           focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e8e1d5]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-[#14110c] transition-transform duration-500 ease-out
                             group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative transition-colors duration-300 group-hover:text-[#f1ece1]">
                  {labels.loadMoreText}
                </span>
              </button>
            </div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}