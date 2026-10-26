export type CauseAmount = {
  value: number;
  impact?: string;
};

export type Cause = {
  slug: string;
  featured?: boolean;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  raised: number;
  goal: number;
  supporters: number;
  currency: string;
  endDate?: string;
  amounts?: CauseAmount[];
  linkTo: string;
};

export type CauseDetailLabels = {
  amountLabel: string;
  donateText: string;
  daysLabel: string;
  raisedLabel: string;
  goalLabel: string;
  supportersLabel: string;
};

export type MilestoneStatus = "done" | "current" | "upcoming";

export type CauseDetails = {
  location: string;
  story: string|[{title : string | undefined, dis : string | undefined}];
  highlights: { label: string; value: string }[];
  fundsUse: { label: string; percent: number }[];
  milestones: {
    title: string;
    description: string;
    date: string;
    status: MilestoneStatus;
  }[];
  updates: { date: string; title: string; body: string }[];
  team: { name: string; role: string }[];
  faqs: { question: string; answer: string }[];
};

export type DetailSectionLabels = {
  storyTitle: string;
  highlightsTitle: string;
  fundsTitle: string;
  milestonesTitle: string;
  updatesTitle: string;
  teamTitle: string;
  faqTitle: string;
  locationLabel: string;
  milestoneStatus: Record<MilestoneStatus, string>;
};