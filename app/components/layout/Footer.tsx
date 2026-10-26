
"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import content from "@/app/data/header_footer.json";
import { footerContent } from "@/app/types/header";
import { SectionTitle } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";

const data: footerContent = content.footer;

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const wordmarkVariants: Variants = {
    hidden: { y: "45%", opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.4, ease } },
};

/* Small built-in social icons; the icon key falls back to the label */
function SocialIcon({ name }: { name: string }) {
    const k = name.toLowerCase();
    const common = { viewBox: "0 0 24 24", "aria-hidden": true, className: "h-[18px] w-[18px]" } as const;
    if (k.includes("facebook"))
        return (
            <svg {...common} fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1z" />
            </svg>
        );
    if (k.includes("instagram"))
        return (
            <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
            </svg>
        );
    if (k === "x" || k.includes("twitter"))
        return (
            <svg {...common} fill="currentColor">
                <path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.7L17.5 3zm-1.1 16h1.8L6.7 4.9H4.8L16.4 19z" />
            </svg>
        );
    if (k.includes("youtube"))
        return (
            <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
            </svg>
        );
    if (k.includes("linkedin"))
        return (
            <svg {...common} fill="currentColor">
                <path d="M4.5 9h3v11h-3V9zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4zM10 9h2.9v1.5c.5-.9 1.7-1.8 3.4-1.8 3.3 0 3.7 2.2 3.7 4.9V20h-3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20h-3V9z" />
            </svg>
        );
    return <span className="text-xs font-semibold">{name.slice(0, 2)}</span>;
}

/* Footer link with an underline that draws in on hover */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href || "#"}
            className="group relative inline-block py-1 text-[15px] text-[#bdb7aa] outline-none transition-colors duration-200
                 hover:text-[#f1ece1] focus-visible:text-[#f1ece1]
                 focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
        >
            {children}
            <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#e8c99a] transition-transform
                   duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
        </a>
    );
}

export default function Footer() {
    const {
        logo,
        about,
        cta,
        newsletter,
        columns = [],
        contact,
        socials = [],
        copyright,
        legalLinks = [],
        wordmark = "WKX",
    } = data;

    const reduce = useReducedMotion();
    const [logoFailed, setLogoFailed] = useState(!logo?.src);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "done">("idle");

    const onSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        // Connect this to your newsletter API here
        setStatus("done");
        setEmail("");
    };

    const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

    return (
        <footer
            className="relative overflow-hidden border-t border-[#e8c99a]/15 bg-[#0a0a09]
                 bg-[radial-gradient(50%_70%_at_0%_100%,#1c2a22_0%,transparent_70%)]
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
        >
            <MainContainer>
                <div className="mx-auto px-5">
                    {/* Call to action */}
                    {cta && (
                        <motion.div
                            variants={stagger}
                            initial={reduce ? false : "hidden"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            className="grid items-end gap-10 border-b border-[#e8c99a]/15 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20 lg:py-24"
                        >
                            <SectionTitle
                                titleStart={cta.title}
                                titleAccent={cta.titleAccent}
                                tone={'dark'}
                            />

                            <motion.div variants={rise} className="max-w-[26rem] lg:pb-2">
                                {cta.text && <p className="text-base leading-[1.9]">{cta.text}</p>}
                                {cta.btnText && (
                                    <a
                                        href={cta.linkTo || "#"}
                                        className="group relative mt-8 inline-flex items-center gap-5 overflow-hidden bg-[#e0503a] px-6 py-[18px]
                             text-[15px] font-semibold tracking-[0.01em] text-[#14110c]
                             transition-shadow duration-300 hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.7)]
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 -translate-x-full bg-[#ef6e58] transition-transform duration-500 ease-out
                               group-hover:translate-x-0 motion-reduce:transition-none"
                                        />
                                        <span className="relative">{cta.btnText}</span>
                                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                                            strokeLinejoin="round" aria-hidden="true"
                                            className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                            <path d="M3 11L11 3M4.5 3H11v6.5" />
                                        </svg>
                                    </a>
                                )}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Main columns */}
                    <motion.div
                        variants={stagger}
                        initial={reduce ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20"
                    >
                        {/* Brand */}
                        <motion.div variants={rise} className="lg:col-span-4">
                            <Link
                                href="/"
                                aria-label="WKX Foundation home"
                                className="inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
                            >
                                {!logoFailed && logo?.src ? (
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt ?? "WKX Foundation"}
                                        width={160}
                                        height={40}
                                        onError={() => setLogoFailed(true)}
                                        className="h-20 w-auto"
                                    />
                                ) : (
                                    <span className="flex items-center gap-2.5">
                                        <span className="grid h-9 w-9 place-items-center border border-[#e8c99a]/50 text-[15px] font-semibold text-[#e8c99a]">
                                            W
                                        </span>
                                        <span className="text-lg font-semibold tracking-[0.04em] text-[#f1ece1]">WKX Foundation</span>
                                    </span>
                                )}
                            </Link>

                            {about && <p className="mt-6 max-w-[22rem] text-[15px] leading-[1.85]">{about}</p>}

                            {socials.length > 0 && (
                                <ul className="mt-8 flex gap-3">
                                    {socials.map((s) => (
                                        <li key={s.label}>
                                            <motion.a
                                                href={s.linkTo || "#"}
                                                aria-label={s.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.94 }}
                                                className="grid h-11 w-11 place-items-center border border-[#e8c99a]/25 text-[#ece6da] outline-none
                                 transition-colors duration-300 hover:border-[#e8c99a] hover:bg-[#e8c99a] hover:text-[#14110c]
                                 focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
                                            >
                                                <SocialIcon name={s.icon || s.label} />
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>

                        {/* Link columns */}
                        {columns.length > 0 && (
                            <motion.div variants={rise} className="grid grid-cols-2 gap-10 lg:col-span-4">
                                {columns.map((col) => (
                                    <nav key={col.title} aria-label={col.title}>
                                        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-medium text-[#ece6da]">
                                            {col.title}
                                        </h3>
                                        <ul className="mt-5 space-y-1.5">
                                            {col.links.map((l) => (
                                                <li key={l.label}>
                                                    <FooterLink href={l.linkTo}>{l.label}</FooterLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                ))}
                            </motion.div>
                        )}

                        {/* Contact and newsletter */}
                        <motion.div variants={rise} className="lg:col-span-4">
                            {contact && (
                                <>
                                    <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-2xl font-medium text-[#ece6da]">
                                        {contact.title || "Contact"}
                                    </h3>
                                    <address className="mt-5 space-y-1.5 text-[15px] not-italic leading-[1.8]">
                                        {contact.address && <p>{contact.address}</p>}
                                        {contact.email && (
                                            <p>
                                                <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
                                            </p>
                                        )}
                                        {contact.phone && (
                                            <p>
                                                <FooterLink href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</FooterLink>
                                            </p>
                                        )}
                                    </address>
                                </>
                            )}

                        </motion.div>
                    </motion.div>
                </div>
            </MainContainer>

            {/* Oversized wordmark that rises into place and fades toward the bottom */}
            <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
                <motion.p
                    variants={wordmarkVariants}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mx-auto -mb-[0.16em] max-w-[1600px] whitespace-nowrap text-center
                     font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(110px,24vw,380px)]
                     font-medium leading-[0.8] tracking-[-0.04em]
                     bg-gradient-to-b from-[#e8c99a]/30 to-transparent bg-clip-text text-transparent"
                >
                    {wordmark}
                </motion.p>
            </div>

            {/* Bottom bar */}
            <div className="relative border-t border-[#e8c99a]/15 bg-[#0a0a09]/60 backdrop-blur-sm">
                <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-6 text-[13px] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-[115px]">
                    <p className="text-[#8f8a80]">{copyright}</p>

                    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                        {legalLinks.length > 0 && (
                            <nav aria-label="Legal" className="flex flex-wrap gap-x-7 gap-y-1">
                                {legalLinks.map((l) => (
                                    <FooterLink key={l.label} href={l.linkTo}>
                                        <span className="text-[13px]">{l.label}</span>
                                    </FooterLink>
                                ))}
                            </nav>
                        )}

                        <button
                            type="button"
                            onClick={toTop}
                            className="group inline-flex items-center gap-2.5 text-[#ece6da] outline-none transition-colors
                         hover:text-[#e8c99a] focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4
                         focus-visible:ring-offset-[#0a0a09]"
                        >
                            Back to top
                            <span className="grid h-9 w-9 place-items-center border border-[#e8c99a]/30 transition-colors group-hover:border-[#e8c99a] group-hover:bg-[#e8c99a] group-hover:text-[#14110c]">
                                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                    strokeLinejoin="round" aria-hidden="true"
                                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5">
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