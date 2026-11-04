import type { Metadata } from "next";
import data from "@/app/data/program.json";
import ProgramsShowcase from "@/app/components/program/Programsshowcase";
import InnerPageBanner from "../components/InnerPageBanner";

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
       <InnerPageBanner data={data.programsHero} />
      <ProgramsShowcase data={data.programsShowcase} programs={data.programs} />
    </main>
  );
}