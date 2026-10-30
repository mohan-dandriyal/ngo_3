
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

import type {
  HomeBlogContent,
  BlogPost,
} from "@/app/types/blog";

const ease: [number, number, number, number] = [
  0.2, 0.8, 0.15, 1,
];

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

// Shared image component
function BlogImage({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#20251f] ${
        featured ? "aspect-[16/10]" : "aspect-[16/10]"
      }`}
    >
      <Image
        src={post.image}
        alt={post.imageAlt}
        fill
        sizes={
          featured
            ? "(max-width: 1023px) 100vw, 55vw"
            : "(max-width: 1023px) 40vw, 18vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
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
      className="group flex h-full flex-col"
    >
      <Link
        href={post.linkTo}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8c686]"
        aria-label={`${readMoreText}: ${post.title}`}
      >
        <BlogImage post={post} featured />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="border border-[#a8c686]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a8c686]">
            {label}
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-[#a8c686]">
            {post.category}
          </span>
        </div>

        <h3 className="mt-4 max-w-[22ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(28px,3vw,30px)] font-medium leading-[1.12] tracking-[-0.02em] text-[#ece6da] transition-colors duration-300 group-hover:text-[#a8c686]">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-4 max-w-[55ch] text-sm leading-[1.9] text-[#aaa99f]">
            {post.excerpt?.slice(0,90)}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-xs text-[#8f9489]">
            <CalendarDays size={14} />
            <time dateTime={post.date}>
              {formatDate(post.date, locale)}
            </time>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#ece6da] transition-colors group-hover:text-[#a8c686]">
            {readMoreText}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
      className="group border-b border-white/10 py-6 first:pt-0 last:border-b-0"
    >
      <Link
        href={post.linkTo}
        className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8c686]"
        aria-label={`${readMoreText}: ${post.title}`}
      >
        {/* Thumbnail */}
        <BlogImage post={post} />

        {/* Text */}
        <div className="flex min-h-full flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a8c686]">
              {post.category}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <time
              dateTime={post.date}
              className="text-[10px] text-[#8f9489]"
            >
              {formatDate(post.date, locale)}
            </time>
          </div>

          <h3 className="mt-3 line-clamp-3 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-xl font-medium leading-[1.2] text-[#ece6da] transition-colors duration-300 group-hover:text-[#a8c686] sm:text-2xl">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 hidden line-clamp-2 text-sm leading-[1.8] text-[#96988e] sm:block">
              {post.excerpt}
            </p>
          )}

          <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-[#c6c2b8] transition-colors group-hover:text-[#a8c686]">
            {readMoreText}
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function HomeBlog({ data }: HomeBlogContent) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd,
    description,
    linkText,
    linkTo,
    readMoreText,
    dateLocale = "en-IN",
    featuredLabel,
    posts = [],
  } = data;

  const reduce = useReducedMotion();

  const [featured, ...remainingPosts] = posts;
  const recentPosts = remainingPosts.slice(0, 3);

  if (!featured) return null;

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-[#0a0a09] py-20 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa] sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#27382e]/30 blur-[130px]"
      />

      <MainContainer>
        <div className="relative mx-auto">

          {/* Section heading */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              {eyebrow && (
                <motion.div variants={rise}>
                  <Eyebrow eyebrow={eyebrow} />
                </motion.div>
              )}

              <motion.div variants={rise} className="mt-4">
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="dark"
                />
              </motion.div>

              {description && (
                <motion.p
                  variants={rise}
                  className="mt-5 max-w-[500px] text-sm leading-[1.9] text-[#aaa99f] sm:text-base"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {linkText && linkTo && (
              <motion.div variants={rise} className="lg:pb-3">
                <Link
                  href={linkTo}
                  className="group inline-flex items-center gap-3 border-b border-[#e0503a]/60 pb-2 text-sm text-[#ece6da] transition-colors hover:border-[#a8c686] hover:text-[#a8c686] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8c686]"
                >
                  {linkText}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Featured and recent stories */}
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.1,
              margin: "0px 0px -50px 0px",
            }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.1,
                },
              },
            }}
            className="mt-12 grid items-stretch gap-10 lg:mt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
          >
            <FeaturedBlog
              post={featured}
              label={featuredLabel}
              readMoreText={readMoreText}
              locale={dateLocale}
            />

            {recentPosts.length > 0 && (
              <div className="flex flex-col border-t border-white/10 lg:border-t-0">
                {recentPosts.map((post) => (
                  <RecentBlog
                    key={post.id}
                    post={post}
                    readMoreText={readMoreText}
                    locale={dateLocale}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}
