


export type GalleryBreadcrumbItem = {
  label: string;
  linkTo?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryHeroData = {
  breadcrumb: GalleryBreadcrumbItem[];
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  image: GalleryImage;
  imageCaption: string;
  scrollText: string;
  scrollTarget: string;
};

export type GalleryCategory = {
  id: string;
  label: string;
};

export type GalleryItem = {
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  image: GalleryImage;
  year: string;
  size: "large" | "normal";
};

export type GallerySectionData = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  allLabel: string;
  emptyMessage: string;
  categories: GalleryCategory[];
  items: GalleryItem[];
  bottomNote: string;
  bottomLinkText: string;
  bottomLink: string;
};

export type GalleryPageData = {
  galleryHero: GalleryHeroData;
  gallerySection: GallerySectionData;
};
