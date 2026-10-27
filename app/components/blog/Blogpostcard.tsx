"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/app/types/blog";
import { formatDate } from "@/app/lib/blog-utils";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Variant names match the parent grid, so its stagger drives each card */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

interface BlogPostCardProps {
  post: BlogPost;
  /** "light" for sand backgrounds, "dark" for dark backgrounds */
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
      className={`group relative flex flex-col overflow-hidden border transition-shadow duration-500
        ${dark
          ? "border-[#e8c99a]/15 bg-[#121411] hover:shadow-[0_28px_50px_-26px_rgba(232,201,154,0.35)]"
          : "border-[#14110c]/10 bg-[#2b2b2b] hover:shadow-[0_28px_50px_-28px_rgba(20,17,12,0.5)]"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#161a17]">
        {!failed ? (
          <Image
            src={post.image}
            alt={post.imageAlt || ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
        )}
        <span className="absolute bottom-4 left-4 bg-[#0a0a09] px-3.5 py-2 text-[13px] font-medium text-[#f4dab2]">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
        <p className={`flex flex-wrap items-center text-[13px] ${dark ? "text-[#8f8a80]" : "text-[#bdbdbd]"}`}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <span className={`ml-3 border-l pl-3 ${dark ? "border-[#e8c99a]/25" : "border-[#14110c]/20"}`}>{post.readTime}</span>
          )}
        </p>

        <h3
          className={`mt-3 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[28px] font-medium leading-[1.12]
            ${dark ? "text-[#ece6da]" : "text-[#ffff]"}`}
        >
          {/* The link stretches over the whole card */}
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-[#e0503a]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
          >
            {post.title}
          </Link>
        </h3>

        <p className={`mt-4 line-clamp-3 text-[15px] leading-relaxed ${dark ? "text-[#bdb7aa]" : "text-[#bdbdbd]"}`}>
          {post.excerpt}
        </p>

        {readText && (
          <span
            className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${dark ? "text-[#ece6da]" : "text-[#bdbdbd]"}`}
          >
            {readText}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="text-[#e0503a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        )}
      </div>
    </motion.article>
  );
}