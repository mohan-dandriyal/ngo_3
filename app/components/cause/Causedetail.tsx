
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

const percentOf = (raised: number, goal: number) =>
  goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

const formatAmount = (value: number, currencySymbol: string) =>
  `${currencySymbol}${value.toLocaleString("en-IN")}`;

const statusColors: Record<
  "done" | "current" | "upcoming",
  string
> = {
  done: "bg-[#A8C686] text-[#171A12]",
  current: "bg-[#EE503B] text-white",
  upcoming: "bg-white/10 text-[#B9B5AC]",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="mb-6 font-serif text-2xl sm:text-3xl">
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
    <main className="overflow-hidden bg-[#0A0B09] text-[#EAE3D6]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#B9B5AC]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#EE503B]"
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
                className="transition-colors hover:text-[#EE503B]"
              >
                {breadcrumbRoot}
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>

            <li aria-current="page" className="text-[#EAE3D6]">
              {cause.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div>
          <span className="inline-flex border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#A8C686]">
            {cause.category}
          </span>

          <h1 className="mt-7 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
            {cause.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#B9B5AC] md:text-lg">
            {cause.description}
          </p>

          {details?.location && (
            <p className="mt-5 flex items-start gap-2 text-sm text-[#B9B5AC]">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#A8C686]"
                aria-hidden="true"
              />
              <span>{details.location}</span>
            </p>
          )}

         
        </div>

        <div className="relative aspect-[4/3] overflow-hidden bg-[#20211C]">
          <Image
            src={cause.image}
            alt={cause.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span className="absolute bottom-5 left-5 border border-white/30 bg-black/20 px-4 py-2 text-xs text-white backdrop-blur-sm">
            {cause.category}
          </span>
        </div>
      </section>

     

      {/* Cause details */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 md:py-15 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-14 md:space-y-20">
          {details ? (
            <>
              {/* Location */}
              {details.location && (
                <section className="border-t border-white/10 pt-10">
                  <Eyebrow eyebrow={detailLabels.locationLabel} />
                  <p className="mt-4 text-lg leading-8 text-[#B9B5AC]">
                    {details.location}
                  </p>
                </section>
              )}

              {/* Story: story is an array of { title, dis } objects */}
              {details.story?.length > 0 && (
                <div id="story" className="space-y-12">
                  {details && details.story.map((story, index) => (
                    <Section
                      key={`${cause.slug}-story-${index}`}
                      title={story?.title || detailLabels.storyTitle}
                    >
                      <div className="space-y-5">
                        {story?.dis.map((paragraph: string, paragraphIndex: number) => (
                          <p
                            key={`${cause.slug}-story-${index}-paragraph-${paragraphIndex}`}
                            className="text-base leading-8 text-[#B9B5AC] md:text-lg"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </Section>
                  ))}
                </div>
              )}

              {/* Milestones */}
              {details.milestones?.length ? (
                <Section title={detailLabels.milestonesTitle}>
                  <div className="space-y-0">
                    {details.milestones.map((milestone, index) => (
                      <article
                        key={`${milestone.title}-${index}`}
                        className="relative border-l border-white/20 pb-9 pl-7 last:pb-0"
                      >
                        <span
                          className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                            milestone.status === "done"
                              ? "bg-[#A8C686]"
                              : milestone.status === "current"
                                ? "bg-[#EE503B]"
                                : "bg-[#77776F]"
                          }`}
                        />

                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-medium">
                            {milestone.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${
                              statusColors[milestone.status]
                            }`}
                          >
                            {detailLabels.milestoneStatus[milestone.status]}
                          </span>
                        </div>

                        <p className="mt-2 text-xs uppercase tracking-wider text-[#8D8A80]">
                          {milestone.date}
                        </p>

                        <p className="mt-3 leading-7 text-[#B9B5AC]">
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
                        className="group border border-white/10 px-5 py-5"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                          <span>{faq.question}</span>

                          <span className="text-xl text-[#EE503B] transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <p className="mt-4 text-sm leading-7 text-[#B9B5AC]">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </Section>
              ) : null}
            </>
          ) : (
            <div className="border border-white/10 p-6">
              <h2 className="font-serif text-2xl">
                {detailLabels.storyTitle}
              </h2>
              <p className="mt-3 leading-7 text-[#B9B5AC]">
                More project details will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related causes */}
      {related.length > 0 && (
        <section className="border-t border-white/10 px-5 py-16 sm:px-8 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <Eyebrow eyebrow={grid.eyebrow} />

            <SectionTitle
              titleStart={grid.titleStart}
              titleAccent={grid.titleAccent}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/our-cause/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#20211C]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                    <span className="absolute left-5 top-5 border border-white/30 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {item.category}
                    </span>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-serif text-2xl leading-tight text-white">
                        {item.title}
                      </h3>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#A8C686]">
                        Learn more
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </div>
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
