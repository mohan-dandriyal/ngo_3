"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/app/types/blog";
import { formatDate } from "@/app/lib/blog-utils";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

interface BlogPostCardProps {
  post: BlogPost;
  tone?: "light" | "dark";
  readText?: string;
}

export default function BlogPostCard({ post, tone = "light", readText }: BlogPostCardProps) {
  const [failed, setFailed] = useState(!post.image);
  const dark = tone === "dark";

  return (
    <motion.article
      layout
      variants={cardVariants}
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative flex flex-col overflow-hidden rounded-xs border transition-all duration-500
        ${dark
          ? "border-[#e8c99a]/15 bg-[#121411] text-[#ece6da] hover:shadow-[0_28px_50px_-26px_rgba(232,201,154,0.35)]"
          : "border-[#e5dfd5] bg-white text-[#141714] shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#ede7dc]">
        {!failed && post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt || ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
        )}
        <span className="absolute bottom-4 left-4 border border-black/10 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#141714] shadow-xs backdrop-blur-md">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex flex-wrap items-center text-xs font-medium text-[#737a73]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <span className="ml-3 border-l border-[#141714]/15 pl-3">{post.readTime}</span>
          )}
        </p>

        <h3
          className="mt-3 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[26px] font-bold leading-[1.18] text-[#141714] transition-colors duration-300 group-hover:text-[#e0503a]"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-300 after:absolute after:inset-0
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3.5 line-clamp-3 text-[14px] leading-relaxed text-[#505750]">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141714] transition-colors group-hover:text-[#e0503a]">
            {readText || "Read story"}
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="text-[#e0503a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
