import { ReactNode } from "react";

export type headerContent = {
    logo : {src : string, alt : string}|undefined
    navItems : { label: string; linkTo: string; } [],
    btnText: string,
    linkToBtn : string
}

export type footerContent = {
  logo?: { src: string; alt?: string };
  about?: string;
  cta?: { title: string; titleAccent?: string; text?: string; btnText?: string; linkTo?: string };
  newsletter?: { title: string; placeholder?: string; btnText?: string; successText?: string };
  columns?: { title: string; links: { label: string; linkTo: string }[] }[];
  contact?: { title?: string; address?: string; email?: string; phone?: string };
  socials?: { label: string; linkTo: string; icon?: string }[];
  copyright?: string;
  legalLinks?: { label: string; linkTo: string }[];
  wordmark?: string;
};