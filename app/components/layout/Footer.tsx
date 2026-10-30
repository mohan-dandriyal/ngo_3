
"use client";

import { useState, } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import content from "@/app/data/header_footer.json";
import type { footerContent } from "@/app/types/header";
import { SectionTitle } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";

const data = content.footer as footerContent & {
  labels: {
    homeLink: string;
    socialNavigation: string;
    legalNavigation: string;
    backToTop: string;
  };
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const wordmarkVariants: Variants = {
  hidden: {
    y: "45%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease,
    },
  },
};

function SocialIcon({ name }: { name: string }) {
  const icon = name.toLowerCase();

  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "h-[18px] w-[18px]",
  };

  if (icon.includes("facebook")) {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1z" />
      </svg>
    );
  }

  if (icon.includes("instagram")) {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.2"
          cy="6.8"
          r="0.8"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (icon === "x" || icon.includes("twitter")) {
    return (
      <svg {...common} fill="currentColor">
        <path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.7L17.5 3zm-1.1 16h1.8L6.7 4.9H4.8L16.4 19z" />
      </svg>
    );
  }

  if (icon.includes("youtube")) {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path
          d="M10 9.5l5 2.5-5 2.5z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (icon.includes("linkedin")) {
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.5 9h3v11h-3V9zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4zM10 9h2.9v1.5c.5-.9 1.7-1.8 3.4-1.8 3.3 0 3.7 2.2 3.7 4.9V20h-3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20h-3V9z" />
      </svg>
    );
  }

  return (
    <span className="text-xs font-semibold">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href || "#"}
      className="group relative inline-block py-1 text-[14px] text-[#bdb7aa]
      outline-none transition-colors duration-200 hover:text-[#f1ece1]
      focus-visible:text-[#f1ece1] focus-visible:ring-2
      focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4
      focus-visible:ring-offset-[#0a0a09]"
    >
      {children}

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left
        scale-x-0 bg-[#e8c99a] transition-transform duration-300
        group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}

export default function Footer() {
  const {
    logo,
    about,
    cta,
    columns = [],
    contact,
    socials = [],
    copyright,
    legalLinks = [],
    wordmark,
    labels,
  } = data;

  const reduce = useReducedMotion();

  const [logoFailed, setLogoFailed] = useState(false);




  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const phoneHref = contact?.phone?.replace(/[^\d+]/g, "");

  return (
    <footer
      className="relative overflow-hidden border-t border-[#e8c99a]/15
      bg-[#0a0a09] bg-[radial-gradient(50%_70%_at_0%_100%,#1c2a22_0%,transparent_70%)]
      font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      <MainContainer>
        <div className="mx-auto px-5">

          {/* CTA SECTION */}
          {cta && (
            <motion.div
              variants={stagger}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid items-center gap-8 border-b border-[#e8c99a]/15
              py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:py-20"
            >
              <SectionTitle
                titleStart={cta.title}
                titleAccent={cta.titleAccent}
                tone="dark"
              />

              <motion.div variants={rise} className="max-w-[27rem]">
                {cta.text && (
                  <p className="text-[15px] leading-[1.9] text-[#bdb7aa]">
                    {cta.text}
                  </p>
                )}

                {cta.btnText && (
                  <Link
                    href={cta.linkTo || "#"}
                    className="group relative mt-7 inline-flex items-center
                    gap-5 overflow-hidden bg-[#e0503a] px-6 py-4
                    text-[14px] font-semibold text-[#14110c]
                    transition-shadow duration-300
                    hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.7)]
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-[#ef6e58]
                      transition-transform duration-500 group-hover:translate-x-0"
                    />

                    <span className="relative">{cta.btnText}</span>

                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="relative h-3.5 w-3.5 transition-transform
                      duration-300 group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5"
                    >
                      <path d="M3 11L11 3M4.5 3H11v6.5" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* MAIN FOOTER CONTENT */}
          <motion.div
            variants={stagger}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12
            lg:gap-10 lg:py-20"
          >

            {/* BRAND */}
            <motion.div variants={rise} className="lg:col-span-4">
              <Link
                href="/"
                aria-label={labels.homeLink}
                className="inline-flex items-center rounded-sm outline-none
                focus-visible:ring-2 focus-visible:ring-[#e8c99a]
                focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
              >
                {!logoFailed && logo?.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt ?? ""}
                    width={200}
                    height={70}
                    onError={() => setLogoFailed(true)}
                    className="h-14 w-auto max-w-[250px] object-contain object-left sm:h-16"
                  />
                ) : (
                  <span className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center
                    border border-[#e8c99a]/50 text-lg font-semibold text-[#e8c99a]">
                      W
                    </span>
                    <span className="text-lg font-semibold tracking-wide text-[#f1ece1]">
                      WKX Foundation
                    </span>
                  </span>
                )}
              </Link>

              {about && (
                <p className="mt-6 max-w-[22rem] text-[14px] leading-[1.9] text-[#a9a398]">
                  {about}
                </p>
              )}

              {/* SOCIAL LINKS */}
              {socials.length > 0 && (
                <nav
                  aria-label={labels.socialNavigation}
                  className="mt-7"
                >
                  <ul className="flex flex-wrap gap-3">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <motion.a
                          href={social.linkTo}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={reduce ? undefined : { y: -3 }}
                          whileTap={reduce ? undefined : { scale: 0.95 }}
                          className="grid h-10 w-10 place-items-center
                          border border-[#e8c99a]/25 text-[#ece6da]
                          outline-none transition-colors duration-300
                          hover:border-[#e8c99a] hover:bg-[#e8c99a]
                          hover:text-[#14110c]
                          focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
                        >
                          <SocialIcon name={social.icon || social.label} />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </motion.div>

            {/* NAVIGATION COLUMNS */}
            {columns.length > 0 && (
              <motion.div
                variants={rise}
                className={`grid grid-cols-2 gap-x-6 gap-y-10 ${
                  columns.length >= 3
                    ? "lg:col-span-5 lg:grid-cols-3"
                    : "lg:col-span-4 lg:grid-cols-2"
                }`}
              >
                {columns.map((column) => (
                  <nav key={column.title} aria-label={column.title}>
                    <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
                    text-2xl font-medium text-[#ece6da]">
                      {column.title}
                    </h3>

                    <ul className="mt-5 space-y-2">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <FooterLink href={link.linkTo}>
                            {link.label}
                          </FooterLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </motion.div>
            )}

            {/* CONTACT + NEWSLETTER */}
            <motion.div
              variants={rise}
              className="lg:col-span-3"
            >
              {contact && (
                <div>
                  <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
                  text-2xl font-medium text-[#ece6da]">
                    {contact.title}
                  </h3>

                  <address className="mt-5 space-y-3 text-[14px] not-italic leading-[1.8]">

                    {contact.address && (
                      <p>
                        {(contact as typeof contact & { mapLink?: string }).mapLink ? (
                          <a
                            href={(contact as typeof contact & { mapLink?: string }).mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-[#e8c99a]
                            focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-[#e8c99a]"
                          >
                            {contact.address}
                          </a>
                        ) : (
                          contact.address
                        )}
                      </p>
                    )}

                    {contact.email && (
                      <p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="transition-colors hover:text-[#e8c99a]"
                        >
                          {contact.email}
                        </a>
                      </p>
                    )}

                    {contact.phone && (
                      <p>
                        <a
                          href={`tel:${phoneHref}`}
                          className="transition-colors hover:text-[#e8c99a]"
                        >
                          {contact.phone}
                        </a>
                      </p>
                    )}
                  </address>
                </div>
              )}

            
            </motion.div>
          </motion.div>
        </div>
      </MainContainer>

      {/* OVERSIZED WORDMARK */}
      {wordmark && (
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden"
        >
          <motion.p
            variants={wordmarkVariants}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto -mb-[0.16em] max-w-[1600px]
            whitespace-nowrap text-center
            font-['Cormorant_Garamond','EB_Garamond',Georgia,serif]
            text-[clamp(110px,24vw,380px)] font-medium leading-[0.8]
            tracking-[-0.04em] bg-gradient-to-b from-[#e8c99a]/30
            to-transparent bg-clip-text text-transparent"
          >
            {wordmark}
          </motion.p>
        </div>
      )}

      {/* BOTTOM BAR */}
      <div className="relative border-t border-[#e8c99a]/15 bg-[#0a0a09]/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5
        px-5 py-6 text-center sm:px-8 md:flex-row
        md:items-center md:justify-between md:text-left lg:px-16">

          <p className="text-[13px] leading-relaxed text-[#8f8a80]">
            {copyright}
          </p>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center md:justify-end">

            {legalLinks.length > 0 && (
              <nav
                aria-label={labels.legalNavigation}
                className="flex flex-wrap justify-center gap-x-6 gap-y-2"
              >
                {legalLinks.map((link) => (
                  <FooterLink key={link.label} href={link.linkTo}>
                    <span className="text-[13px]">
                      {link.label}
                    </span>
                  </FooterLink>
                ))}
              </nav>
            )}

            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-2.5
              text-[13px] text-[#ece6da] outline-none
              transition-colors hover:text-[#e8c99a]
              focus-visible:ring-2 focus-visible:ring-[#e8c99a]
              focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
            >
              {labels.backToTop}

              <span className="grid h-9 w-9 place-items-center
              border border-[#e8c99a]/30 transition-colors
              group-hover:border-[#e8c99a] group-hover:bg-[#e8c99a]
              group-hover:text-[#14110c]">
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform
                  duration-300 group-hover:-translate-y-0.5"
                >
                  <path d="M7 12V2M3 6l4-4 4 4" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
