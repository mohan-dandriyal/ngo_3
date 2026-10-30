"use client"

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

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

type Post = {
  title: string;
  category?: string;
  date?: string;
  readTime?: string;
  image?: string;
  imageAlt?: string;
  linkTo?: string;
  excerpt?: string;
};

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-y-1 text-xs text-[#737a73]">
      {post.category && <span className="pr-3 font-bold uppercase tracking-wider text-[#e0503a]">{post.category}</span>}
      {post.date && (
        <time dateTime={post.date} className="border-l border-[#141714]/15 px-3 first:border-l-0 first:pl-0">
          {formatDate(post.date)}
        </time>
      )}
      {post.readTime && <span className="border-l border-[#141714]/15 pl-3">{post.readTime}</span>}
    </p>
  );
}

function Picture({ post, sizes }: { post: Post; sizes: string }) {
  const [failed, setFailed] = useState(!post.image);
  return failed ? (
    <div className="h-full w-full bg-[linear-gradient(160deg,#2a5c43,#141714)]" aria-hidden="true" />
  ) : (
    <Image
      src={post.image ?? ""}
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
    <motion.article variants={featuredVariants} className="group relative rounded-xs border border-[#e5dfd5] bg-white p-6 shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)] transition-all duration-300">
      <motion.div variants={frameVariants} className="relative aspect-[16/11] overflow-hidden rounded-xs bg-[#ede7dc]">
        <motion.div variants={pictureVariants} className="absolute inset-0">
          <Picture post={post} sizes="(min-width: 1024px) 55vw, 100vw" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
      </motion.div>

      <div className="mt-6">
        <Meta post={post} />
        <h3 className="mt-3.5 max-w-[34ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#141714]">
          <a
            href={post.linkTo || "#"}
            className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-[#e0503a]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
          >
            {post.title}
          </a>
        </h3>
        {post.excerpt && <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.85] text-[#505750]">{post.excerpt}</p>}
      </div>
    </motion.article>
  );
}

/* Compact story with a thumbnail */
export function PostRow({ post }: { post: Post }) {
  return (
    <motion.article variants={rowVariants} className="group relative py-6 first:pt-0 lg:first:pt-0">
      <motion.span
        variants={lineVariants}
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#ede7dc] group-first:hidden"
      />

      <div className="grid grid-cols-[100px_1fr] items-center gap-4 sm:grid-cols-[140px_1fr] sm:gap-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-[#ede7dc]">
          <Picture post={post} sizes="(min-width: 640px) 140px, 100px" />
        </div>

        <div>
          <Meta post={post} />
          <h3 className="mt-2 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[20px] font-bold leading-[1.2] text-[#141714] transition-colors group-hover:text-[#e0503a] sm:text-[24px]">
            <a
              href={post.linkTo || "#"}
              className="transition-colors duration-300 after:absolute after:inset-0
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
