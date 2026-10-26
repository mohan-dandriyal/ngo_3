import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/app/data/post.json";
import type { BlogPost } from "@/app/types/blog";
import BlogPostHero from "@/app/components/blog/Blogposthero";
import BlogArticle from "@/app/components/blog/Blogarticle";
import BlogRelated from "@/app/components/blog/Blogrelated";

const posts = data.posts as unknown as BlogPost[];

// In Next 15 params is a Promise. On Next 13 or 14, use `{ params }: { params: { slug: string } }`
// and remove the `await`.
type Props = { params: Promise<{ slug: string }> };

/* Builds one page per post at build time */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | ${data.meta.siteName}`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.image, alt: post.imageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Same category first, then the newest of the rest
  const others = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <main>
      <BlogPostHero post={post} labels={data.labels} />
      <BlogArticle post={post} labels={data.labels} />
      <BlogRelated posts={others} labels={data.labels} />
    </main>
  );
}