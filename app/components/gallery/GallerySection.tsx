"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GallerySectionData } from "@/app/types/gallery";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

type GallerySectionProps = {
  data: GallerySectionData;
};

export default function GallerySection({ data }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return data.items;

    return data.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, data.items]);

  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? i : (i - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? i : (i + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Keyboard controls + lock page scroll while the popup is open
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  return (
    <section
      id="gallery-collection"
      className="scroll-mt-10 bg-[#0A0B09] px-5 pb-20 text-[#EAE3D6] sm:px-8 md:pb-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-8 border-t border-white/10 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            {data.eyebrow && <Eyebrow eyebrow={data.eyebrow} />}

            {data.titleStart && (
              <SectionTitle
                titleStart={data.titleStart}
                titleAccent={data.titleAccent}
              />
            )}

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#B9B5AC] md:text-base">
              {data.description}
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.15em] text-[#B9B5AC]">
            {String(filteredItems.length).padStart(2, "0")} photographs
          </p>
        </div>

        <div
          className="mb-10 flex flex-wrap gap-2 md:mb-12"
          role="group"
          aria-label="Filter gallery by category"
        >
          {data.categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-3 text-xs transition-all duration-300 ${
                  isActive
                    ? "border-[#EE503B] bg-[#EE503B] text-white"
                    : "border-white/15 text-[#B9B5AC] hover:border-[#EE503B] hover:text-[#EAE3D6]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6"
          >
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.28),
                }}
                className={`group ${
                  item.size === "large" && activeCategory === "all"
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#20211C] ${
                    item.size === "large" && activeCategory === "all"
                      ? "aspect-5/3"
                      : "aspect-4/5"
                  }`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={
                      item.size === "large" && activeCategory === "all"
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-5 top-5 border border-white/30 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>

                  <span className="absolute right-5 top-5 text-xs text-white/80">
                    {item.year}
                  </span>

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs text-white/75">
                        {String(item.id).padStart(2, "0")} / WKX
                      </p>
                      <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Click target covering the whole card */}
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`View ${item.title} full size`}
                    className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#EE503B]"
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="border border-white/10 px-6 py-16 text-center text-sm text-[#B9B5AC]">
            {data.emptyMessage}
          </div>
        )}

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-serif text-xl italic text-[#B9B5AC]">
            {data.bottomNote}
          </p>

          <Link
            href={data.bottomLink}
            className="inline-flex items-center gap-3 self-start text-sm transition-colors hover:text-[#EE503B] sm:self-auto"
          >
            {data.bottomLinkText}
            <ArrowDownRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Lightbox popup */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 p-3 text-white transition-colors hover:border-[#EE503B] hover:bg-[#EE503B] sm:right-8 sm:top-8"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-3 text-white transition-colors hover:border-[#EE503B] hover:bg-[#EE503B] sm:left-8"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-3 text-white transition-colors hover:border-[#EE503B] hover:bg-[#EE503B] sm:right-8"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            )}

            <motion.figure
              key={selectedItem.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-5xl flex-col items-center"
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={selectedItem.image.src}
                  alt={selectedItem.image.alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>

              <figcaption className="mt-5 flex w-full items-end justify-between gap-4 text-white">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/60">
                    {selectedItem.categoryLabel} · {selectedItem.year}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl">
                    {selectedItem.title}
                  </h3>
                </div>

                <p className="text-xs text-white/60">
                  {String((selectedIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}