


export type DonateImage = {
    src: string;
    alt: string;
};

export type DonateHeroData = {
    breadcrumb: { label: string, href: string }
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    image: DonateImage;
    imageCaption: string;
    primaryCta: string;
    trustNote: string;
};

export type DonationFrequency = {
    id: "once" | "monthly";
    label: string;
};

export type DonationAmount = {
    value: number;
    label: string;
    impact: string;
};

export type DonationFormData = {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    currency: string;
    currencySymbol: string;
    frequencyOptions: DonationFrequency[];
    amounts: DonationAmount[];
    customAmountLabel: string;
    customAmountPlaceholder: string;
    donorTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    anonymousLabel: string;
    submitLabel: string;
    secureNote: string;
    disclaimer: string;
};

export type ImpactItem = {
    number: string;
    title: string;
    description: string;
};

export type DonatePageData = {
    hero: DonateHeroData;
    donation: DonationFormData;
};
