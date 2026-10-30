"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

import type { BlogPost } from "@/app/types/blog";

type HomeBlogProps = {
  data: BlogSectionData;
};

type BlogSectionData = {
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  description?: string;
  linkText?: string;
  linkTo?: string;
  readMoreText: string;
  dateLocale?: string;
  featuredLabel?: string;
  recentUpdatesLabel?: string;
  articlesLabel?: string;
  posts?: any[];
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

function formatDate(date: string, locale: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function BlogImage({ post }: { post: BlogPost }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xs bg-[#ede7dc]">
      <Image
        src={post.image}
        alt={post.imageAlt || post.title}
        fill
        sizes="(max-width: 1023px) 100vw, 55vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
    </div>
  );
}

// Featured blog card
function FeaturedBlog({
  post,
  label,
  readMoreText,
  locale,
}: {
  post: BlogPost;
  label: string;
  readMoreText: string;
  locale: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease }}
      className="group flex h-full flex-col rounded-xs border border-[#e5dfd5] bg-white p-6 shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-300 hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)] sm:p-7"
    >
      <Link
        href={post.linkTo}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
        aria-label={`${readMoreText}: ${post.title}`}
      >
        <BlogImage post={post} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="border border-[#2a5c43]/30 bg-[#2a5c43]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#2a5c43]">
            {label}
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e0503a]">
            {post.category}
          </span>
        </div>

        <h3 className="mt-4 max-w-[24ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(26px,2.8vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#141714] transition-colors duration-300 group-hover:text-[#e0503a]">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3.5 line-clamp-3 max-w-[55ch] text-[14px] leading-[1.85] text-[#505750]">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#ede7dc] pt-5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#737a73]">
            <CalendarDays size={14} className="text-[#e0503a]" />
            <time dateTime={post.date}>
              {formatDate(post.date, locale)}
            </time>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141714] transition-colors group-hover:text-[#e0503a]">
            {readMoreText}
            <ArrowUpRight
              size={14}
              className="text-[#e0503a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

// Recent blog row
function RecentBlog({
  post,
  readMoreText,
  locale,
}: {
  post: BlogPost;
  readMoreText: string;
  locale: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3, ease }}
      className="group border-b border-[#ede7dc] py-6 first:pt-0 last:border-b-0"
    >
      <Link
        href={post.linkTo}
        className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6"
        aria-label={`${readMoreText}: ${post.title}`}
      >
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-xs">
          <BlogImage post={post} />
        </div>

        {/* Text */}
        <div className="flex min-h-full flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#e0503a]">
              {post.category}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[#141714]/20 sm:block" />

            <time
              dateTime={post.date}
              className="text-[11px] font-medium text-[#737a73]"
            >
              {formatDate(post.date, locale)}
            </time>
          </div>

          <h3 className="mt-2 line-clamp-2 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-xl font-bold leading-[1.25] text-[#141714] transition-colors duration-300 group-hover:text-[#e0503a] sm:text-2xl">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 hidden line-clamp-2 text-xs leading-[1.75] text-[#555d55] sm:block">
              {post.excerpt}
            </p>
          )}

          <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#141714] transition-colors group-hover:text-[#e0503a]">
            {readMoreText}
            <ArrowUpRight
              size={13}
              className="text-[#e0503a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function HomeBlog({ data }: HomeBlogProps) {
  const reduce = useReducedMotion();

  const {
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd = "",
    description,
    linkText,
    linkTo,
    readMoreText,
    dateLocale = "en-IN",
    featuredLabel = "Featured",
    posts = [],
  } = data;

  const featured = posts[0];
  const recents = posts.slice(1, 4);

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-white py-20 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#141714] sm:py-24 lg:py-28"
    >
      <MainContainer>
        <div className="relative">
          {/* Section heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12"
          >
            <div className="max-w-[700px]">
              {eyebrow && (
                <motion.div variants={rise} className="mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </motion.div>
              )}

              <motion.div variants={rise}>
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="light"
                />
              </motion.div>
            </div>

            <div className="max-w-[420px] lg:pb-3">
              {description && (
                <motion.p
                  variants={rise}
                  className="text-sm leading-7 text-[#525a52] sm:text-base sm:leading-8"
                >
                  {description}
                </motion.p>
              )}

              {linkText && (
                <motion.div variants={rise} className="mt-6">
                  <Link
                    href={linkTo || "/blog"}
                    className="group inline-flex items-center gap-3 border-b-2 border-[#e0503a] pb-1.5 text-sm font-semibold text-[#141714] transition-colors hover:text-[#e0503a]"
                  >
                    {linkText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Blog layout */}
          {posts.length > 0 && (
            <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              {/* Featured story */}
              {featured && (
                <div>
                  <FeaturedBlog
                    post={featured}
                    label={featuredLabel}
                    readMoreText={readMoreText}
                    locale={dateLocale}
                  />
                </div>
              )}

              {/* Recent list */}
              {recents.length > 0 && (
                <div className="flex flex-col justify-between rounded-xs border border-[#e5dfd5] bg-[#faf8f5] p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-[#ede7dc] pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2a5c43]">
                      {data.recentUpdatesLabel || "Recent Updates"}
                    </span>
                    <span className="text-xs font-semibold text-[#737a73]">
                      {recents.length} {data.articlesLabel || "articles"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {recents.map((post) => (
                      <RecentBlog
                        key={post.slug || post.id}
                        post={post}
                        readMoreText={readMoreText}
                        locale={dateLocale}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}
