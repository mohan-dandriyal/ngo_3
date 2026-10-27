"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Check, Link2 } from "lucide-react";
import type { BlogLabels, BlogPost, ContentBlock } from "@/app/types/blog";
import { slugify } from "@/app/lib/blog-utils";
import MainContainer from "../ui/MainContainer";

interface BlogArticleProps {
  post: BlogPost;
  labels: BlogLabels;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Every block of the article fades up once as it scrolls into view */
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
          <p className="text-[18px] leading-[1.95] text-[#bdbdbd]">{block.text}</p>
        </Reveal>
      );

    case "heading":
      return (
        <Reveal reduce={reduce}>
          <h2
            id={slugify(block.text)}
            className="scroll-mt-32 pt-6 font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(32px,3.4vw,46px)] font-medium leading-[1.1] tracking-[-0.01em] text-[#ebe9e9]"
          >
            {block.text}
          </h2>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal reduce={reduce}>
          <blockquote className="relative my-4 border-l-[3px] border-[#e0503a] py-2 pl-7 sm:pl-10">
            <p className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(28px,3vw,40px)] font-medium italic leading-[1.2] text-[#eeeeee]">
              {block.text}
            </p>
            {block.cite && <footer className="mt-4 text-sm font-medium text-[#dc4d32]">{block.cite}</footer>}
          </blockquote>
        </Reveal>
      );

    case "list":
      return (
        <Reveal reduce={reduce}>
          <ul className="space-y-3.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-4 text-[18px] leading-[1.7] text-[#c7c7c7]">
                <span aria-hidden="true" className="mt-[0.7em] h-2 w-2 flex-none rounded-full bg-[#e0503a]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case "image":
      return (
        <Reveal reduce={reduce}>
          <figure className="m-0 my-4">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#161a17]">
              <Image
                src={block.src}
                alt={block.alt || ""}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
            {block.caption && <figcaption className="mt-3 text-sm text-[#5a544c]">{block.caption}</figcaption>}
          </figure>
        </Reveal>
      );
  }
}

export default function BlogArticle({ post, labels }: BlogArticleProps) {
  const reduce = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);

  // Thin reading progress bar across the top of the screen
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });

  // Table of contents is built from the heading blocks
  const headings = post.content.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading");
  const [activeId, setActiveId] = useState<string>(headings[0] ? slugify(headings[0].text) : "");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id));
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(slugify(h.text));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  // Share links need the page address, which is only known in the browser
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard can be blocked; the share links below still work */
    }
  };


  const [avatarFailed, setAvatarFailed] = useState(!post.author?.image);
  const initials = (post.author?.name ?? "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  return (
    <section
      className="w-full bg-[#0a0a09] text-[#14110c] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
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
          className="grid gap-12 py-16 lg:grid-cols-[240px_minmax(0,720px)] lg:justify-center lg:gap-20 lg:py-24"
        >
          {/* Sidebar: contents and sharing */}
          <aside className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-32">
              {headings.length > 0 && (
                <nav aria-label={labels.tocTitle} className="hidden lg:block">
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#dc4d32]">{labels.tocTitle}</p>
                  <ol className="space-y-1 border-l border-[#14110c]/15">
                    {headings.map((h) => {
                      const id = slugify(h.text);
                      const active = activeId === id;
                      return (
                        <li key={id} className="relative">
                          {active && (
                            <motion.span
                              layoutId="toc-marker"
                              aria-hidden="true"
                              className="absolute -left-px top-0 h-full w-[2px] bg-[#e0503a]"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <a
                            href={`#${id}`}
                            aria-current={active ? "location" : undefined}
                            className={`block py-2 pl-5 text-[15px] leading-snug outline-none transition-colors duration-200
                              focus-visible:text-[#e0503a] ${active ? "font-semibold text-[#e8e8e8]" : "text-[#e6e6e6] hover:text-[#14110c]"}`}
                          >
                            {h.text}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}
            </div>
          </aside>

          {/* Body */}
          <div className="order-1 space-y-8 lg:order-2">
            {post.content.map((block, i) => (
              <Block key={i} block={block} reduce={reduce} />
            ))}

   

        
          </div>
        </article>
      </MainContainer>
    </section>
  );
}