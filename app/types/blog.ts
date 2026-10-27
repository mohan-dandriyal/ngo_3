
export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "quote"; text: string; cite?: string }
    | { type: "image"; src: string; alt?: string; caption?: string }
    | { type: "list"; items: string[] };

export type BlogAuthor = {
    name: string;
    role?: string;
    image?: string;
};

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string; // YYYY-MM-DD
    readTime?: string;
    image: string;
    blogDetailImage: string;
    imageAlt?: string;
    author: BlogAuthor;
    tags?: string[];
    content: ContentBlock[];
};

export type BlogHeroData = {
    breadcrumb?: { label: string; linkTo?: string }[];
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    latestLabel?: string;
};

export type BlogListLabels = {
    eyebrow?: string;
    titleStart?: string;
    titleAccent?: string;
    allLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    emptyText: string;
    loadMoreText: string;
    pageSize?: number;
};

export type BlogLabels = {
    homeLabel: string;
    blogLabel: string;
    backText: string;
    readText: string;
    tocTitle: string;
    shareLabel: string;
    copyLinkText: string;
    copiedText: string;
    tagsLabel: string;
    writtenBy: string;
    relatedEyebrow: string;
    relatedTitleStart: string;
    relatedTitleAccent: string;
    relatedLinkText: string;
};