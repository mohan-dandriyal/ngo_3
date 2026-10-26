export type ProgramStat = {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    plain?: boolean; // true skips thousands separators, for years
};

export type ProgramItem = {
    id: string;
    number?: string;
    category?: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    stats?: ProgramStat[];
    highlights?: string[];
};

export type ProgramsHeroData = {
    breadcrumb : { label: string; linkTo?: string }[];
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    indexLabel?: string;
    image?: { src: string; alt?: string };
};



export type ProgramsCtaData = {
    breadcrumb?: { label: string; linkTo?: string }[];
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    primaryButton?: { text: string; link: string };
    secondaryButton?: { text: string; link: string };
};