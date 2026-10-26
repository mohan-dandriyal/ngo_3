"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {  ChevronRight } from "lucide-react";
import type {
  Cause,
  CauseAmount,
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

const DEFAULT_AMOUNTS: CauseAmount[] = [
  { value: 500 },
  { value: 1000 },
  { value: 2500 },
  { value: 5000 },
];

const percentOf = (raised: number, goal: number) =>
  goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

export default function CauseDetail({
  cause,
  related,
  breadcrumbRoot,
  grid,
}: CauseDetailProps) {
  const amounts = cause.amounts?.length ? cause.amounts : DEFAULT_AMOUNTS;

  const [selected] = useState<number | null>(
    amounts[1]?.value ?? amounts[0].value
  );
  const [custom] = useState("");

  const customValue = Number(custom);
  const hasCustom = custom !== "" && customValue > 0;


  return (
    <main className="bg-[#0A0B09] text-[#EAE3D6]">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 sm:px-8 md:pb-28 lg:px-16">
        {/* Breadcrumb */}
        <div aria-label="Breadcrumb" className="mb-8 md:mb-12">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#B9B5AC]">
            <li>
              <Link href="/" className="transition-colors hover:text-[#EE503B]">
                Home
              </Link>
            </li>
            <ChevronRight size={14} aria-hidden="true" />
            <li>
              <Link
                href="/our-cause"
                className="transition-colors hover:text-[#EE503B]"
              >
                {breadcrumbRoot}
              </Link>
            </li>
            <ChevronRight size={14} aria-hidden="true" />
            <li aria-current="page" className="text-[#EAE3D6]">
              {cause.title}
            </li>
          </ol>
        </div>

        <div className="grid gap-10 lg:w-8/12 mx-auto lg:gap-16">
          {/* Left: story */}
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#20211C]">
              <Image
                src={cause.image}
                alt={cause.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 border border-white/30 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                {cause.category}
              </span>
            </div>

            <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              {cause.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#B9B5AC] md:text-lg">
              {cause.description}
            </p>

          
          </div>
        </div>

        {/* Related causes */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-12 md:mt-28">
            <Eyebrow eyebrow={grid.eyebrow} />
            <SectionTitle
              titleStart={grid.titleStart}
              titleAccent={grid.titleAccent}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const p = percentOf(item.raised, item.goal);

                return (
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
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                      <span className="absolute left-5 top-5 border border-white/30 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="font-serif text-2xl leading-tight text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="mb-6 font-serif text-2xl sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}