"use client"

import { useEffect, useState } from "react";
import content from "@/app/data/header_footer.json";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { headerContent } from "@/app/types/header";

const data: headerContent = content.header;

export default function Header() {
    const { logo, navItems = [], btnText, linkToBtn } = data;
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoFailed, setLogoFailed] = useState(!logo?.src);

    // Condense the header once the page is scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the mobile menu with Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const isActive = (href?: string) =>
        !!href && href !== "#" && !href.startsWith("#") && (href === "/" ? pathname === "/" : pathname?.startsWith(href));

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]
                 ${scrolled
                    ? "border-[#e8c99a]/25 bg-[#0a0a09]/80 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                    : "border-[#e8c99a]/15 bg-[#0a0a09] bg-[radial-gradient(60%_220%_at_88%_0%,#27382e_0%,transparent_70%)]"}`}
        >
            {/* Thin gold light along the bottom edge */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r
                   from-transparent via-[#e8c99a]/60 to-transparent"
            />

            <div
                className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6
                   px-5 transition-[height] duration-300 sm:px-8 lg:px-[72px]
                   min-[860px]:grid-cols-[1fr_auto_1fr]
                   ${scrolled ? "h-16 min-[860px]:h-20" : "h-20 min-[860px]:h-[90px]"}`}
            >
                {/* Brand */}
                <Link
                    href="/"
                    aria-label="WKX Foundation home"
                    className="inline-flex items-center gap-3 justify-self-start rounded-sm outline-none
                     focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
                >
                    {!logoFailed && logo?.src ? (
                        <Image
                            src={logo.src}
                            alt={logo.alt ?? "WKX Foundation"}
                            width={160}
                            height={40}
                            priority
                            onError={() => setLogoFailed(true)}
                            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-18" : "h-20"}`}
                        />
                    ) : (
                        <span className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center border border-[#e8c99a]/50 text-[15px] font-semibold text-[#e8c99a]">
                                W
                            </span>
                            <span className="text-lg font-semibold tracking-[0.04em] text-[#f1ece1]">
                                WKX Foundation
                            </span>
                        </span>
                    )}
                </Link>

                {/* Nav */}
                <nav
                    id="wkx-nav"
                    aria-label="Main"
                    className={`absolute left-0 right-0 top-full z-10 flex flex-col
                      border-b border-[#e8c99a]/20 bg-[#0a0a09]/95 px-5 pb-5 pt-2 backdrop-blur-xl
                      transition-[opacity,transform] duration-300 ease-out sm:px-8
                      ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}
                      min-[860px]:pointer-events-auto min-[860px]:static min-[860px]:translate-y-0 min-[860px]:flex-row
                      min-[860px]:gap-10 min-[860px]:border-0 min-[860px]:bg-transparent
                      min-[860px]:p-0 min-[860px]:opacity-100 min-[860px]:backdrop-blur-none`}
                >
                    {navItems.filter((i) => i.label).map((item) => {
                        const active = isActive(item.linkTo);
                        return (
                            <Link
                                key={item.label}
                                href={item.linkTo || "#"}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                className={`relative border-b border-[#e8c99a]/15 py-4
                           font-['Poppins','Helvetica_Neue',Arial,sans-serif] text-[20px] font-medium leading-none
                           tracking-[0.005em] outline-none
                           transition-colors duration-200 hover:text-[#f1ece1] focus-visible:text-[#f1ece1]
                           min-[860px]:border-b-0 min-[860px]:py-2 min-[860px]:text-[15px] min-[860px]:tracking-[0.01em]
                           after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left
                           after:bg-[#e8c99a] after:transition-transform after:duration-300 after:ease-out
                           min-[860px]:after:-bottom-0.5 min-[860px]:after:h-[2px]
                           hover:after:scale-x-100 focus-visible:after:scale-x-100
                           ${active ? "text-[#f1ece1] after:scale-x-100" : "after:scale-x-0"}`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-self-end">
                    {btnText && (
                        <Link
                            href={linkToBtn || "#"}
                            className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#e8c99a] p-[13px]
                         text-[15px] font-semibold tracking-[0.02em] text-[#14110c] outline-none
                         shadow-[0_0_0_0_rgba(232,201,154,0)] transition-shadow duration-300
                         hover:shadow-[0_8px_28px_-6px_rgba(232,201,154,0.55)]
                         focus-visible:ring-2 focus-visible:ring-[#f1d9b3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a09]
                         sm:px-[22px] sm:py-[14px]"
                        >
                            {/* Lighter fill sweeps in on hover */}
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 -translate-x-full bg-[#f6e3c3] transition-transform duration-500
                           ease-out group-hover:translate-x-0 motion-reduce:transition-none"
                            />
                            <span className="relative hidden sm:inline">{btnText}</span>
                            <svg
                                viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                                className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            >
                                <path d="M3 11L11 3M4.5 3H11v6.5" />
                            </svg>
                            <span className="sr-only sm:hidden">{btnText}</span>
                        </Link>
                    )}

                    {/* Menu toggle: three lines morph into a cross */}
                    <button
                        aria-expanded={open}
                        aria-controls="wkx-nav"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen(!open)}
                        className="relative inline-flex h-11 w-11 items-center justify-center border border-[#e8c99a]/25
                       text-[#f1ece1] outline-none transition-colors hover:border-[#e8c99a]/60 hover:bg-[#e8c99a]/10
                       focus-visible:ring-2 focus-visible:ring-[#e8c99a] min-[860px]:hidden"
                    >
                        <span aria-hidden="true" className="relative block h-[14px] w-[18px]">
                            <span
                                className={`absolute left-0 h-[1.6px] w-full bg-current transition-all duration-300
                                ${open ? "top-[6px] rotate-45" : "top-0"}`}
                            />
                            <span
                                className={`absolute left-0 top-[6px] h-[1.6px] w-full bg-current transition-opacity duration-200
                                ${open ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`absolute left-0 h-[1.6px] w-full bg-current transition-all duration-300
                                ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`}
                            />
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}