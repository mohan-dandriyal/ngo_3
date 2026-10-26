
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import data from "@/app/data/causes.json";
import extra from "@/app/data/causeDetails.json";
import CauseDetail from "@/app/components/cause/Causedetail";
import type { Cause, CauseDetails } from "@/app/types/causeDetail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const causes = data.causes as Cause[];

const detailsBySlug = extra.details as unknown as Record<
  string,
  CauseDetails
>;

export function generateStaticParams() {
  return causes.map((cause) => ({
    slug: cause.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cause = causes.find((item) => item.slug === slug);

  if (!cause) {
    return {
      title: `Cause not found | ${data.meta.siteName}`,
    };
  }

  return {
    title: `${cause.title} | ${data.meta.siteName}`,
    description: cause.description,
    openGraph: {
      title: cause.title,
      description: cause.description,
      images: [cause.image],
    },
  };
}

export default async function CauseDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const cause = causes.find((item) => item.slug === slug);

  if (!cause) {
    notFound();
  }

  const related = causes
    .filter((item) => item.slug !== cause.slug)
    .sort(
      (a, b) =>
        Number(b.category === cause.category) -
        Number(a.category === cause.category)
    )
    .slice(0, 3);

  return (
    <CauseDetail
      cause={cause}
      related={related}
      details={detailsBySlug[slug] ?? null}
      detailLabels={extra.labels}
      currencySymbol={data.hero.currencySymbol}
      breadcrumbRoot={data.hero.breadcrumb[1].label}
      labels={data.featured}
      grid={{
        eyebrow: data.grid.eyebrow,
        titleStart: "Other ways to",
        titleAccent: "make a difference.",
        raisedLabel: data.grid.raisedLabel,
      }}
      cta={data.cta}
    />
  );
}
