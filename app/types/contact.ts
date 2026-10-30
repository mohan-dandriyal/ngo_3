import { breadcrumb } from "./breadcrumb";

export type ContactHero = {
    breadcrumb?: { label: string; linkTo?: string }[];
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    ideaNote?: string;
    ideaHighlight?: string;
    image?: { src: string; alt?: string };
    imageCaption?: string;
    scrollText?: string;
    scrollTarget?: string;
};

export type ContactMethod = {
    id: string;
    icon: string;
    title: string;
    description: string;
    value: string;
    link: string;
};

export type ContactField = {
    name: string;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "tel" | "number" | "textarea";
    required?: boolean;
};

export type ContactSection = {
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    description?: string;
    ideaNote?: string;
    ideaHighlight?: string;
    contactMethods?: ContactMethod[];
    form?: {
        eyebrow?: string;
        title?: string;
        description?: string;
        fields: ContactField[];
        submitText: string;
        successMessage: string;
        errorMessage?: string;
        resetText?: string;
    };
};