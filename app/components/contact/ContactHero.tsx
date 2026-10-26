"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { ContactHero as ContactHeroType } from "@/app/types/contact";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow } from "../ui/SectionContent";
import BreadCrumb from "../ui/BreadCrumb";

interface ContactHeroProps {
    data: ContactHeroType;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow and Description join the same stagger */
const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const headline: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const word: Variants = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 1.1, ease } },
};
const pop: Variants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -40 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 160, damping: 16 } },
};

function Words({ text, className = "" }: { text: string; className?: string }) {
    return (
        <>
            {text
                .split(" ")
                .filter(Boolean)
                .map((w, i) => (
                    <span
                        key={`${w}-${i}`}
                        aria-hidden="true"
                        className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-bottom"
                    >
                        <motion.span variants={word} className={`inline-block ${className}`}>
                            {w}
                        </motion.span>
                    </span>
                ))}
        </>
    );
}

/* Round scroll button with text running around the arrow */
function ScrollCue({ text, href, reduce }: { text: string; href: string; reduce: boolean | null }) {
    // Repeat the text so it fills the circle (about 30 characters fit)
    const repeats = Math.max(1, Math.round(30 / (text.length + 3)));
    const ring = Array.from({ length: repeats }).map(() => `${text} • `).join("");

    return (
        <motion.a
            variants={pop}
            href={href}
            aria-label={text}
            className="group relative inline-grid h-32 w-32 place-items-center rounded-full outline-none sm:h-36 sm:w-36
                 focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a09]"
        >
            <motion.svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
                <defs>
                    <path id="contact-hero-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text
                    className="fill-[#ece6da] transition-colors duration-300 group-hover:fill-[#e0503a]"
                    style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
                >
                    <textPath href="#contact-hero-circle" textLength={286} lengthAdjust="spacing">
                        {ring}
                    </textPath>
                </text>
            </motion.svg>

            <span
                className="relative grid h-14 w-14 place-items-center rounded-full border border-[#ece6da]/40 text-[#ece6da]
                   transition-colors duration-300 group-hover:border-[#e0503a] group-hover:bg-[#e0503a] group-hover:text-[#14110c]"
            >
                <ArrowDown
                    size={22}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-y-1"
                />
            </span>
        </motion.a>
    );
}

export default function ContactHero({ data }: ContactHeroProps) {
    const { breadcrumb,
        eyebrow,
        titleStart,
        titleAccent,
        description,
        image,
        imageCaption,
        scrollText,
        scrollTarget = "#contact",
    } = data ?? ({} as ContactHeroType);

    const reduce = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(!image?.src);

    // The picture drifts slowly inside its frame while scrolling
    const frameRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, reduce ? 0 : 40]);

    return (
        <section
            id="contact-hero"
            className="relative w-full overflow-hidden bg-[#0a0a09] bg-[radial-gradient(45%_45%_at_0%_0%,#1c2a22_0%,transparent_70%)]
                 text-[#bdb7aa] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
        >
            <MainContainer>
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    className="grid items-center gap-14 py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:py-24"
                >
                    {/* Copy */}
                    <div>

                        {breadcrumb && <BreadCrumb breadcrumb={breadcrumb} />}

                        {eyebrow && <Eyebrow eyebrow={eyebrow} />}

                        <motion.h1
                            variants={headline}
                            aria-label={`${titleStart} ${titleAccent}`}
                            className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(56px,8.6vw,100px)]
                         font-medium leading-[0.98] tracking-[-0.02em] text-[#ece6da]"
                        >
                            <Words text={titleStart} />
                            <em className="font-medium italic text-[#e0503a]">
                                <Words text={titleAccent} />
                            </em>
                        </motion.h1>

                        {description && (
                            <div className="mt-8">
                                <Description description={description} variant="body" />
                            </div>
                        )}

                        {scrollText && (
                            <div className="mt-12">
                                <ScrollCue text={scrollText} href={scrollTarget} reduce={reduce} />
                            </div>
                        )}
                    </div>

                    {/* Image */}
                    <motion.figure
                        ref={frameRef}
                        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.3 }}
                        className="relative m-0 aspect-[4/5] w-full overflow-hidden bg-[#161a17] ring-1 ring-[#e8c99a]/15"
                    >
                        {!imgFailed && image?.src ? (
                            <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
                                <motion.div
                                    className="absolute inset-0"
                                    initial={reduce ? false : { scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 2.2, ease, delay: 0.3 }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt || ""}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                        onError={() => setImgFailed(true)}
                                        className="object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,#27382e,#0a0a09)]" aria-hidden="true" />
                        )}

                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />

                        {imageCaption && (
                            <motion.figcaption
                                initial={reduce ? false : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease, delay: 1.5 }}
                                className="absolute inset-x-6 bottom-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#ece6da]"
                            >
                                <span className="h-px w-8 bg-[#e0503a]" aria-hidden="true" />
                                {imageCaption}
                            </motion.figcaption>
                        )}
                    </motion.figure>
                </motion.div>
            </MainContainer>
        </section>
    );
}