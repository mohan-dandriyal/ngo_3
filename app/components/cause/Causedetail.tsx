"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, MapPin } from "lucide-react";

import type {
  Cause,
  CauseDetailLabels,
  CauseDetails,
  DetailSectionLabels,
} from "@/app/types/causeDetail";

import { Eyebrow, SectionTitle } from "../ui/SectionContent";

type CauseDetailProps = {
  cause: Cause;
  related: Cause[];
  details: CauseDetails | null;
  detailLabels: DetailSectionLabels;
  currencySymbol: string;
  breadcrumbRoot: string;
  labels: CauseDetailLabels & { eyebrow?: string };
  grid: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    raisedLabel: string;
  };
  cta: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    primaryButton: { text: string; link: string };
    secondaryButton: { text: string; link: string };
  };
};

const statusColors: Record<
  "done" | "current" | "upcoming",
  string
> = {
  done: "bg-[#2a5c43]/10 text-[#2a5c43] border border-[#2a5c43]/30",
  current: "bg-[#e0503a] text-white",
  upcoming: "bg-[#141714]/5 text-[#737a73] border border-[#141714]/15",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#ede7dc] pt-10">
      <h2 className="mb-6 font-['Cormorant_Garamond',Georgia,serif] text-3xl font-bold text-[#141714] sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CauseDetail({
  cause,
  related,
  details,
  detailLabels,
  breadcrumbRoot,
  grid,
}: CauseDetailProps) {
  return (
    <main className="overflow-hidden bg-[#faf8f5] text-[#141714]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#737a73]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#e0503a]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>

            <li>
              <Link
                href="/our-cause"
                className="transition-colors hover:text-[#e0503a]"
              >
                {breadcrumbRoot}
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>

            <li aria-current="page" className="font-semibold text-[#141714]">
              {cause.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div>
          <span className="inline-flex border border-[#2a5c43]/30 bg-[#2a5c43]/[0.06] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2a5c43]">
            {cause.category}
          </span>

          <h1 className="mt-6 max-w-3xl font-['Cormorant_Garamond',Georgia,serif] text-4xl font-bold leading-[1.08] text-[#141714] sm:text-5xl md:text-6xl lg:text-7xl">
            {cause.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#4e554e] md:text-lg">
            {cause.description}
          </p>

          {details?.location && (
            <p className="mt-5 flex items-start gap-2 text-sm font-medium text-[#5e665e]">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#2a5c43]"
                aria-hidden="true"
              />
              <span>{details.location}</span>
            </p>
          )}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-[#e5dfd5] bg-[#ede7dc] shadow-[0_12px_30px_-10px_rgba(20,24,20,0.08)]">
          <Image
            src={cause.image}
            alt={cause.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <span className="absolute bottom-4 left-4 border border-black/10 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#141714] shadow-xs backdrop-blur-md">
            {cause.category}
          </span>
        </div>
      </section>

      {/* Cause details */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-12 md:space-y-16">
          {details ? (
            <>
              {/* Location */}
              {details.location && (
                <section className="border-t border-[#ede7dc] pt-10">
                  <Eyebrow eyebrow={detailLabels.locationLabel} tone="light" />
                  <p className="mt-3 text-lg leading-8 text-[#4e554e]">
                    {details.location}
                  </p>
                </section>
              )}

              {/* Story */}
              {details.story?.length > 0 && (
                <div id="story" className="space-y-10">
                  {(Array.isArray(details.story)
                    ? details.story
                    : [{ title: undefined, dis: details.story }]
                  ).map((story, index: number) => {
                    const paragraphs = Array.isArray(story?.dis)
                      ? story.dis
                      : story?.dis
                        ? [story.dis]
                        : [];

                    return (
                      <Section
                        key={`${cause.slug}-story-${index}`}
                        title={story?.title || detailLabels.storyTitle}
                      >
                        <div className="space-y-5">
                          {paragraphs.map((paragraph: string, paragraphIndex: number) => (
                            <p
                              key={`${cause.slug}-story-${index}-paragraph-${paragraphIndex}`}
                              className="text-base leading-8 text-[#4e554e] md:text-lg"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </Section>
                    );
                  })}
                </div>
              )}

              {/* Milestones */}
              {details.milestones?.length ? (
                <Section title={detailLabels.milestonesTitle}>
                  <div className="space-y-0">
                    {details.milestones.map((milestone, index) => (
                      <article
                        key={`${milestone.title}-${index}`}
                        className="relative border-l-2 border-[#ede7dc] pb-9 pl-7 last:pb-0"
                      >
                        <span
                          className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${
                            milestone.status === "done"
                              ? "bg-[#2a5c43]"
                              : milestone.status === "current"
                                ? "bg-[#e0503a]"
                                : "bg-[#adb3ad]"
                          }`}
                        />

                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-[#141714]">
                            {milestone.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              statusColors[milestone.status]
                            }`}
                          >
                            {detailLabels.milestoneStatus[milestone.status]}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#737a73]">
                          {milestone.date}
                        </p>

                        <p className="mt-2.5 leading-7 text-[#505750]">
                          {milestone.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </Section>
              ) : null}

              {/* FAQs */}
              {details.faqs?.length ? (
                <Section title={detailLabels.faqTitle}>
                  <div className="space-y-3">
                    {details.faqs.map((faq, index) => (
                      <details
                        key={`${faq.question}-${index}`}
                        className="group rounded-xs border border-[#e5dfd5] bg-white px-6 py-5 shadow-xs"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#141714]">
                          <span className="text-base sm:text-lg">{faq.question}</span>

                          <span className="text-xl font-bold text-[#e0503a] transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <p className="mt-4 text-sm leading-relaxed text-[#505750]">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </Section>
              ) : null}
            </>
          ) : (
            <div className="rounded-xs border border-[#e5dfd5] bg-white p-6">
              <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold text-[#141714]">
                {detailLabels.storyTitle}
              </h2>
              <p className="mt-3 leading-7 text-[#505750]">
                {detailLabels.emptyText || "More project details will be available soon."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related causes */}
      {related.length > 0 && (
        <section className="border-t border-[#ede7dc] bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <Eyebrow eyebrow={grid.eyebrow} tone="light" />

            <SectionTitle
              titleStart={grid.titleStart}
              titleAccent={grid.titleAccent}
              tone="light"
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/our-cause/${item.slug}`}
                  className="group block overflow-hidden rounded-xs border border-[#e5dfd5] bg-white shadow-[0_4px_20px_-4px_rgba(20,24,20,0.06)] transition-all duration-300 hover:border-[#e0503a]/40 hover:shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#ede7dc]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 border border-black/10 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#141714] shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold leading-tight text-[#141714] transition-colors group-hover:text-[#e0503a]">
                      {item.title}
                    </h3>

                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e0503a]">
                      {(grid as any).learnMoreLabel || "Learn more"}
                      <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
