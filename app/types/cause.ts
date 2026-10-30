export type GiveAmount = { value: number; impact: string };

export type CauseItem = {
  slug: string;
  featured?: boolean;
  category: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  raised: number;
  goal: number;
  supporters?: number;
  currency?: string; // e.g. "INR"
  endDate?: string; // YYYY-MM-DD, shown as days left on the featured cause
  amounts?: GiveAmount[];
  linkTo: string;
  btnText: string
};

export type CausesHeroData = {
  breadcrumb: { label: string; linkTo?: string }[];
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  description?: string;
  currencySymbol?: string;
  primaryButton?: { text: string; link: string };
  statLabels: { raised: string; supporters: string; causes: string };
  image : {src : string, alt : string}
};

export type CausesFeaturedLabels = {
  eyebrow?: string;
  amountLabel: string;
  donateText: string;
  daysLabel: string;
  raisedLabel: string;
  goalLabel: string;
  supportersLabel: string;
};

export type CausesGridLabels = {
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  description?: string;
  allLabel: string;
  raisedLabel: string;
  goalLabel: string;
  supportersLabel: string;
  donateText: string;
  emptyText: string;
};

export type CausesCtaData = {
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  description?: string;
  primaryButton?: { text: string; link: string };
  secondaryButton?: { text: string; link: string };
};

export type HeroStat = { value: number; label: string; prefix?: string };