import type { Metadata } from "next";
import data from "@/app/data/post.json";
import type { BlogPost } from "@/app/types/blog";
import BlogHero from "@/app/components/blog/Bloghero";
import BlogList from "@/app/components/blog/Bloglist";

// The JSON is plain text, so tell TypeScript the content blocks match our types
const posts = data.posts as unknown as BlogPost[];

export const metadata: Metadata = {
  title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
  description: data.meta.blogDescription,
  openGraph: {
    title: `${data.meta.blogTitle} | ${data.meta.siteName}`,
    description: data.meta.blogDescription,
  },
};

export default function BlogPage() {
  // Newest first, so the hero always features the latest story
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <main>
      <BlogHero data={data.blogHero} latest={sorted[0]} />
      <BlogList posts={sorted} labels={data.blogList} readText={data.labels.readText} />
    </main>
  );
}