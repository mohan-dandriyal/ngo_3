import type { Metadata } from "next";
import data from "@/app/data/program.json";
import ProgramsHero from "@/app/components/program/Programshero";
import ProgramsShowcase from "@/app/components/program/Programsshowcase";

const title = `${data.meta.title} | ${data.meta.siteName}`;

export const metadata: Metadata = {
  title,
  description: data.meta.description,
  openGraph: {
    title,
    description: data.meta.description,
    images: data.programsHero.image?.src ? [{ url: data.programsHero.image.src, alt: data.programsHero.image.alt }] : undefined,
  },
};

export default function ProgramsPage() {
  return (
    <main>
      <ProgramsHero data={data.programsHero} programs={data.programs} />
      <ProgramsShowcase data={data.programsShowcase} programs={data.programs} />
      {/* <ProgramsApproach data={data.approach} /> */}
      {/* <ProgramsCta data={data.cta} /> */}
    </main>
  );
}