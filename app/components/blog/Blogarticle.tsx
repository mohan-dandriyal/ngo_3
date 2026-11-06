"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import type { BlogLabels, BlogPost, ContentBlock } from "@/app/types/blog";
import { slugify } from "@/app/lib/blog-utils";
import MainContainer from "../ui/MainContainer";

interface BlogArticleProps {
  post: BlogPost;
  labels: BlogLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

function Reveal({ children, reduce }: { children: React.ReactNode; reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease }}
    >
      {children}
    </motion.div>
  );
}

function Block({ block, reduce }: { block: ContentBlock; reduce: boolean | null }) {
  switch (block.type) {
    case "paragraph":
      return (
        <Reveal reduce={reduce}>
          <p className="text-[17px] sm:text-[18px] leading-[1.95] text-[#3d443d]">{block.text}</p>
        </Reveal>
      );

    case "heading":
      return (
        <Reveal reduce={reduce}>
          <h2
            id={slugify(block.text)}
            className="scroll-mt-32 pt-6 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.15] tracking-[-0.015em] text-[#141714]"
          >
            {block.text}
          </h2>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal reduce={reduce}>
          <blockquote className="relative my-6 rounded-r-xs border-l-4 border-[#e0503a] bg-[#faf8f5] py-4 pl-6 pr-6 sm:pl-8">
            <p className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(22px,2.6vw,34px)] font-medium italic leading-[1.3] text-[#141714]">
              &ldquo;{block.text}&rdquo;
            </p>
            {block.cite && <footer className="mt-3 text-xs font-bold uppercase tracking-wider text-[#e0503a]">{block.cite}</footer>}
          </blockquote>
        </Reveal>
      );

    case "list":
      return (
        <Reveal reduce={reduce}>
          <ul className="space-y-3">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3.5 text-[17px] leading-[1.7] text-[#3d443d]">
                <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-[#e0503a]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case "image":
      return (
        <Reveal reduce={reduce}>
          <figure className="m-0 my-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc]">
              <Image
                src={block.src}
                alt={block.alt || ""}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
            {block.caption && <figcaption className="mt-2.5 text-xs font-medium text-[#737a73]">{block.caption}</figcaption>}
          </figure>
        </Reveal>
      );
  }
}

export default function BlogArticle({ post, labels }: BlogArticleProps) {
  const reduce = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  const headings = post.content.filter(
    (b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading"
  );

  const [activeId, setActiveId] = useState<string>(
    headings[0] ? slugify(headings[0].text) : ""
  );

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-120px 0% -60% 0%" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(slugify(h.text));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <section
      className="w-full bg-white text-[#141714] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      {/* Reading progress */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#e0503a]"
        />
      )}

      <MainContainer>
        <article
          ref={articleRef}
          className="grid gap-12 py-16 lg:justify-center lg:gap-20 lg:py-16"
        >

          {/* Body */}
          <div className="order-1 space-y-7 md:w-8/12 mx-auto lg:order-2">
            {post.content.map((block, i) => (
              <Block key={i} block={block} reduce={reduce} />
            ))}
          </div>
        </article>
      </MainContainer>
    </section>
  );
}
