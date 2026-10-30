
import GalleryHero from "@/app/components/gallery/GalleryHero";
import GallerySection from "@/app/components/gallery/GallerySection";
import galleryData from "@/app/data/gallery.json";
import type { GalleryPageData } from "@/app/types/gallery";

export const metadata = {
  title: "Gallery | WKX Foundation",
  description:
    "Explore the people, communities, and stories behind the work of WKX Foundation."
};

const data = galleryData as GalleryPageData;

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryHero data={data.galleryHero} />
      <GallerySection data={data.gallerySection} />
    </main>
  );
}
