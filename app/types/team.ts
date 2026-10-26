
export type TeamHero = {
    breadcrumb: { label: string; linkTo?: string }[];
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    scrollText?: string;
    scrollTarget?: string;
    images?: { src: string; alt?: string }[];
};

export type TeamMember = {
    name: string;
    role: string;
    department?: string;
    bio?: string;
    image?: string;
    imageAlt?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
};

export type TeamSection = {
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    allLabel?: string;
    members: TeamMember[];
    cta?: { text?: string; linkText?: string; linkTo?: string };
};