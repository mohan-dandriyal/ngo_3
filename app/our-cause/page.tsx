import type { Metadata } from "next";
import data from "@/app/data/causes.json";
import type { CauseItem, HeroStat } from "@/app/types/cause";
import CausesHero from "@/app/components/cause/Causeshero";
import CausesFeatured from "@/app/components/cause/Causesfeatured";
import CausesGrid from "@/app/components/cause/Causesgrid";
import CausesCta from "@/app/components/cause/Causescta";

const causes = data.causes as CauseItem[];

const title = `${data.meta.title} | ${data.meta.siteName}`;

export const metadata: Metadata = {
  title,
  description: data.meta.description,
  openGraph: { title, description: data.meta.description },
};

export default function CausesPage() {
  // The featured cause is the one marked "featured", or the first in the list
  const featured = causes.find((c) => c.featured) ?? causes[0];
  const others = causes.filter((c) => c.slug !== featured?.slug);

  // Totals come from the data, so they update whenever a cause is added or changed
  const labels = data.hero.statLabels;
  const stats: HeroStat[] = [
    {
      value: causes.reduce((sum, c) => sum + c.raised, 0),
      label: labels.raised,
      prefix: data.hero.currencySymbol,
    },
    { value: causes.reduce((sum, c) => sum + (c.supporters ?? 0), 0), label: labels.supporters },
    { value: causes.length, label: labels.causes },
  ];

  return (
    <main>
      <CausesHero data={data.hero} stats={stats} />
      {featured && <CausesFeatured cause={featured} labels={data.featured} />}
      <CausesGrid causes={others} labels={data.grid} />
    </main>
  );
}