"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { BlogLabels, BlogPost } from "@/app/types/blog";
import { formatDate } from "@/app/lib/blog-utils";
import MainContainer from "../ui/MainContainer";

interface BlogPostHeroProps {
  post: BlogPost;
  labels: BlogLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

/**
 * next/image throws if a local src does not start with "/".
 * "post-1-1.png" -> "/post-1-1.png". Absolute URLs and data URIs pass through.
 */
function normalizeSrc(src?: string): string | undefined {
  const value = src?.trim();
  if (!value) return undefined;
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

export default function BlogPostHero({ post, labels }: BlogPostHeroProps) {
  const reduce = useReducedMotion();

  const coverSrc = normalizeSrc(post.blogDetailImage);
  const avatarSrc = normalizeSrc(post.author?.image);

  const [imgFailed, setImgFailed] = useState(!coverSrc);
  const [avatarFailed, setAvatarFailed] = useState(!avatarSrc);

  // The cover picture drifts slowly inside its frame while scrolling
  const frameRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -40, reduce ? 0 : 40]
  );

  const initials = (post.author?.name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section
      id="post-hero"
      className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_100%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="pb-14 pt-10 lg:pb-20 lg:pt-14"
        >
          {/* Breadcrumb and back link */}
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center justify-between gap-4 lg:mb-14"
          >
            <ol className="flex min-w-0 items-center gap-2.5 text-[13px]">
              <li>
                <Link href="/" className="text-[#8f8a80] transition-colors hover:text-[#e8c99a]">
                  {labels.homeLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#8f8a80]">/</li>
              <li>
                <Link href="/blog" className="text-[#8f8a80] transition-colors hover:text-[#e8c99a]">
                  {labels.blogLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#8f8a80]">/</li>
              <li aria-current="page" className="truncate text-[#ece6da]">
                {post.category}
              </li>
            </ol>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-[#ece6da] outline-none transition-colors hover:text-[#e8c99a]
                         focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {labels.backText}
            </Link>
          </motion.nav>

          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              variants={fadeUp}
              className="mb-7 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e9a26b]"
            >
              <span className="h-px w-8 bg-[#e9a26b]" aria-hidden="true" />
              {post.category}
              <span className="h-px w-8 bg-[#e9a26b]" aria-hidden="true" />
            </motion.p>

            <motion.h1
              variants={headline}
              aria-label={post.title}
              className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(40px,6.2vw,92px)]
                         font-medium leading-[1.02] tracking-[-0.02em] text-[#ece6da]"
            >
              {post.title.split(" ").map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  aria-hidden="true"
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Author and meta */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
            >
              {post.author && (
                <div className="flex items-center gap-3.5 text-left">
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-[#27382e] ring-2 ring-[#e8c99a]/40">
                    {!avatarFailed && avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={post.author.name}
                        fill
                        sizes="48px"
                        onError={() => setAvatarFailed(true)}
                        className="object-cover"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-sm font-semibold text-[#e8c99a]">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#ece6da]">
                      {post.author.name}
                    </p>
                    {post.author.role && (
                      <p className="text-[13px] text-[#8f8a80]">{post.author.role}</p>
                    )}
                  </div>
                </div>
              )}

              <p className="flex items-center text-[14px] text-[#bdb7aa]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readTime && (
                  <>
                    <span aria-hidden="true" className="mx-3 text-[#8f8a80]">/</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </p>
            </motion.div>
          </div>

          {/* Cover image */}
          <motion.figure
            ref={frameRef}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.5 }}
            className="relative m-0 mt-14 aspect-[4/3] w-full overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15 sm:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]"
          >
            {!imgFailed && coverSrc ? (
              <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.18 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.2, ease, delay: 0.5 }}
                >
                  <Image
                    src={coverSrc}
                    alt={post.imageAlt || post.title}
                    fill
                    priority
                    sizes="(min-width: 1600px) 1600px, 100vw"
                    onError={() => setImgFailed(true)}
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <div
                className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]"
                aria-hidden="true"
              />
            )}
          </motion.figure>
        </motion.div>
      </MainContainer>
    </section>
  );
}