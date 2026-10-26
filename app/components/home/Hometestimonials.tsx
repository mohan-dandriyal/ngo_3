
"use client"

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";
import MainContainer from "../ui/MainContainer";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];
const INTERVAL = 8000; // ms each quote stays on screen

const headingContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/* Quote slides in from the direction of travel, and out the opposite way */
const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  exit: (d: number) => ({ opacity: 0, x: d * -56, transition: { duration: 0.35, ease: "easeIn" } }),
};

type Testimonial = {
  name: string;
  quote: string;
  image?: string | null;
  imageAlt?: string | null;
  role?: string | null;
};

type HomeTestimonialsContent = {
  data?: {
    eyebrow?: string | null;
    titleStart?: string | null;
    titleAccent?: string | null;
    titleEnd?: string | null;
    testimonials?: Testimonial[] | null;
  } | null;
};

function Avatar({ person }: { person: Testimonial }) {
  const [failed, setFailed] = useState(!person.image);
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full bg-[#27382e] ring-2 ring-[#e8c99a]/40">
      {!failed ? (
        <Image
          src={person.image as string}
          alt={person.imageAlt || person.name}
          fill
          sizes="64px"
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        <span className="grid h-full w-full place-items-center font-['Cormorant_Garamond',Georgia,serif] text-xl font-semibold text-[#e8c99a]">
          {initials}
        </span>
      )}
    </div>
  );
}

export default function HomeTestimonials({ data }: HomeTestimonialsContent) {
  const { eyebrow, titleStart, titleAccent, titleEnd, testimonials } =
    data ?? {};
  const items = Array.isArray(testimonials) ? testimonials : [];
  const total = items.length;

  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  if (total === 0) return null;

  const autoplay = total > 1 && !reduce;
  const goNext = () => { setDir(1); setIndex((i) => (i + 1) % total); };
  const goPrev = () => { setDir(-1); setIndex((i) => (i - 1 + total) % total); };
  const goTo = (n: number) => { setDir(n > index ? 1 : -1); setIndex(n); };

  const current = items[index];

  return (
    <section
      id="testimonials"
      className="overflow-hidden  bg-[radial-gradient(50%_60%_at_100%_0%,#27382e_0%,transparent_70%)]
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#bdb7aa]"
    >
      {/* Progress bar fills over each quote's time on screen; hovering pauses it */}
      <style>{`
        @keyframes testi-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      <MainContainer>
      <div className="mx-auto py-20 lg:py-[50px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.9fr] lg:gap-24">
          {/* Heading and controls */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col justify-between gap-12"
          >
            <div>
              {eyebrow && (
                <Eyebrow eyebrow={eyebrow}  />
              )}

              <SectionTitle
                titleStart={titleStart ?? undefined}
                titleAccent={titleAccent ?? undefined}
                titleEnd={titleEnd ?? undefined}
                tone={'dark'}
              />
              
            </div>

            {total > 1 && (
              <motion.div variants={rise} className="flex items-center gap-6">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="group grid h-12 w-12 place-items-center border border-[#e8c99a]/30 text-[#ece6da] outline-none
                               transition-colors hover:border-[#e8c99a] hover:bg-[#e8c99a] hover:text-[#14110c]
                               focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5">
                      <path d="M13 8H3M7.5 3.5L3 8l4.5 4.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="group grid h-12 w-12 place-items-center border border-[#e8c99a]/30 text-[#ece6da] outline-none
                               transition-colors hover:border-[#e8c99a] hover:bg-[#e8c99a] hover:text-[#14110c]
                               focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
                      <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
                    </svg>
                  </button>
                </div>
                <p className="font-['Cormorant_Garamond',Georgia,serif] text-lg text-[#8f8a80]" aria-hidden="true">
                  <span className="text-[#ece6da]">{String(index + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(total).padStart(2, "0")}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative"
          >
            <svg
              viewBox="0 0 48 40"
              fill="currentColor"
              aria-hidden="true"
              className="mb-8 h-10 w-12 text-[#e0503a] lg:h-12 lg:w-14"
            >
              <path d="M0 40V22.4C0 9.6 6.4 2.1 19.2 0l2 5.6C14.2 7.4 10.8 11.5 10.4 17.6H20V40H0zm26.8 0V22.4C26.8 9.6 33.2 2.1 46 0l2 5.6c-7 1.8-10.4 5.9-10.8 12H46.8V40H26.8z" />
            </svg>

            <div className="relative min-h-[360px] sm:min-h-[320px] lg:min-h-[340px]" aria-live="polite" aria-roledescription="carousel">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={index}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="m-0"
                >
                  <blockquote className="m-0">
                    <p className="max-w-[28ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.2] tracking-[-0.01em] text-[#ece6da] sm:max-w-[34ch]">
                      {current.quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-10 flex items-center gap-5">
                    <Avatar key={index} person={current} />
                    <div>
                      <p className="text-base font-semibold text-[#ece6da]">{current.name}</p>
                      {current.role && <p className="mt-0.5 text-sm text-[#8f8a80]">{current.role}</p>}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Progress segments: past filled, current fills over the interval */}
            {total > 1 && (
              <div className="mt-6 flex gap-3" role="tablist" aria-label="Choose testimonial">
                {items.map((t, i) => {
                  const active = i === index;
                  const past = i < index;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`Show testimonial from ${t.name}`}
                      onClick={() => goTo(i)}
                      className="group relative h-5 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden bg-[#e8c99a]/20 transition-[height] duration-300 group-hover:h-[5px]">
                        <span
                          key={active ? `active-${index}` : `static-${i}`}
                          onAnimationEnd={() => active && goNext()}
                          className="block h-full w-full origin-left bg-[#e0503a]"
                          style={{
                            transform: past || (active && !autoplay) ? "scaleX(1)" : "scaleX(0)",
                            animation: active && autoplay ? `testi-fill ${INTERVAL}ms linear forwards` : undefined,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </MainContainer>

    </section>
  );
}