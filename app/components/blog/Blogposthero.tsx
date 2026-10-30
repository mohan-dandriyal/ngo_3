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
      className="relative w-full overflow-hidden bg-[#faf8f5] text-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="pb-10 pt-8 lg:pb-12 lg:pt-10"
        >
          {/* Breadcrumb and back link */}
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:mb-8"
          >
            <ol className="flex min-w-0 items-center gap-2.5 text-xs font-medium text-[#737a73]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#e0503a]">
                  {labels.homeLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#adb3ad]">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-[#e0503a]">
                  {labels.blogLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#adb3ad]">/</li>
              <li aria-current="page" className="truncate font-semibold text-[#141714]">
                {post.category}
              </li>
            </ol>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141714] outline-none transition-colors hover:text-[#e0503a] focus-visible:ring-2 focus-visible:ring-[#e0503a]"
            >
              <ArrowLeft
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {labels.backText}
            </Link>
          </motion.nav>

          <div className="max-w-4xl text-left">
            <motion.p
              variants={fadeUp}
              className="mb-6 flex items-center justify-start gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e0503a]"
            >
              <span className="h-px w-8 bg-[#e0503a]" aria-hidden="true" />
              {post.category}
            </motion.p>

            <motion.h1
              variants={headline}
              aria-label={post.title}
              className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(36px,5.5vw,76px)]
                         font-bold leading-[1.06] tracking-[-0.02em] text-[#141714] text-left"
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
              className="mt-8 flex flex-wrap items-center justify-start gap-x-8 gap-y-4"
            >
              {post.author && (
                <div className="flex items-center gap-3 text-left">
                  <div className="relative h-11 w-11 flex-none overflow-hidden rounded-full border-2 border-[#2a5c43]/20 bg-[#ede7dc]">
                    {!avatarFailed && avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={post.author.name}
                        fill
                        sizes="44px"
                        onError={() => setAvatarFailed(true)}
                        className="object-cover"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-xs font-bold text-[#2a5c43]">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#141714]">
                      {post.author.name}
                    </p>
                    {post.author.role && (
                      <p className="text-xs text-[#737a73]">{post.author.role}</p>
                    )}
                  </div>
                </div>
              )}

              <p className="flex items-center text-xs font-medium text-[#737a73]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readTime && (
                  <>
                    <span aria-hidden="true" className="mx-2.5 text-[#adb3ad]">/</span>
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
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.3 }}
            className="relative m-0 mt-12 aspect-[4/3] w-full overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_16px_40px_-16px_rgba(20,24,20,0.1)] sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]"
          >
            {!imgFailed && coverSrc ? (
              <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease, delay: 0.3 }}
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
                className="absolute inset-0 bg-[linear-gradient(160deg,#2a5c43,#141714)]"
                aria-hidden="true"
              />
            )}
          </motion.figure>
        </motion.div>
      </MainContainer>
    </section>
  );
}
