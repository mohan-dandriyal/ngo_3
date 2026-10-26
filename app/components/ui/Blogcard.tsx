
"use client"

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Post } from "@/app/types/home";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Variant names match the parent grid, so its stagger drives each item */
const featuredVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: [0.7, 0, 0.2, 1], delay: 0.1 } },
};
const pictureVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.8, ease, delay: 0.1 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease } },
};

function formatDate(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-y-1 text-[13px] text-[#8f8a80]">
      {post.category && <span className="pr-3 font-medium text-[#e9a26b]">{post.category}</span>}
      {post.date && (
        <time dateTime={post.date} className="border-l border-[#e8c99a]/25 px-3 first:border-l-0 first:pl-0">
          {formatDate(post.date)}
        </time>
      )}
      {post.readTime && <span className="border-l border-[#e8c99a]/25 pl-3">{post.readTime}</span>}
    </p>
  );
}

function Picture({ post, sizes }: { post: Post; sizes: string }) {
  const [failed, setFailed] = useState(!post.image);
  return failed ? (
    <div className="h-full w-full bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
  ) : (
    <Image
      src={post.image}
      alt={post.imageAlt || ""}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]
                 motion-reduce:transition-none"
    />
  );
}

/* Large lead story */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <motion.article variants={featuredVariants} className="group relative">
      <motion.div variants={frameVariants} className="relative aspect-[16/11] overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15">
        <motion.div variants={pictureVariants} className="absolute inset-0">
          <Picture post={post} sizes="(min-width: 1024px) 55vw, 100vw" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
      </motion.div>

      <div className="mt-8">
        <Meta post={post} />
        <h3 className="mt-4 max-w-[34ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(32px,3.6vw,52px)] font-medium leading-[1.05] tracking-[-0.01em] text-[#ece6da]">
          {/* The link stretches over the whole card */}
          <a
            href={post.linkTo || "#"}
            className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-[#e8c99a]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
          >
            {post.title}
          </a>
        </h3>
        {post.excerpt && <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.85] text-[#bdb7aa]">{post.excerpt}</p>}

        <span className="relative mt-7 inline-flex items-center gap-3 pb-1.5 text-sm tracking-[0.02em] text-[#ece6da]">
          Read story
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M4.5 3H11v6.5" />
          </svg>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.35] bg-[#e0503a] transition-transform
                       duration-500 ease-out group-hover:scale-x-100"
          />
        </span>
      </div>
    </motion.article>
  );
}

/* Compact story with a thumbnail */
export function PostRow({ post }: { post: Post }) {
  return (
    <motion.article variants={rowVariants} className="group relative py-7 first:pt-0 lg:first:pt-0">
      {/* Divider draws across above each row */}
      <motion.span
        variants={lineVariants}
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#e8c99a]/20 group-first:hidden"
      />

      <div className="grid grid-cols-[112px_1fr] items-center gap-5 sm:grid-cols-[168px_1fr] sm:gap-7">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#161a17]">
          <Picture post={post} sizes="(min-width: 640px) 168px, 112px" />
        </div>

        <div>
          <Meta post={post} />
          <h3 className="mt-2.5 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[22px] font-medium leading-[1.15] text-[#ece6da] sm:text-[28px]">
            <a
              href={post.linkTo || "#"}
              className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-[#e8c99a]
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
            >
              {post.title}
            </a>
          </h3>
        </div>
      </div>
    </motion.article>
  );
}