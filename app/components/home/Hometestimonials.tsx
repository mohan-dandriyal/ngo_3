"use client";

import { useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";

import MainContainer from "../ui/MainContainer";
import { Eyebrow, SectionTitle } from "../ui/SectionContent";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

const slide: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 45,
  }),

  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },

  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -35,
    transition: {
      duration: 0.35,
      ease,
    },
  }),
};

type TestimonialItem = {
  id?: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  imageAlt?: string;
};

type HomeTestimonialsContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent?: string;
    titleEnd?: string;
    slider: {
      autoplay: boolean;
      interval: number;
      imageFallbackLabel: string;
      previousLabel: string;
      nextLabel: string;
      paginationLabel: string;
      slideLabel: string;
    };
    testimonials: TestimonialItem[];
  };
};

function Avatar({
  person,
  fallbackLabel,
}: {
  person: TestimonialItem;
  fallbackLabel: string;
}) {
  const [failed, setFailed] = useState(!person.image);

  const initials = person.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-[#2a5c43]/30 bg-white shadow-xs sm:h-16 sm:w-16">
      {person.image && !failed ? (
        <Image
          src={person.image}
          alt={person.imageAlt || person.name}
          fill
          sizes="64px"
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${fallbackLabel}: ${person.name}`}
          className="grid h-full w-full place-items-center font-['Cormorant_Garamond',Georgia,serif] text-xl font-bold text-[#2a5c43]"
        >
          {initials}
        </div>
      )}
    </div>
  );
}

export default function HomeTestimonials({
  data,
}: HomeTestimonialsContent) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd,
    slider,
    testimonials = [],
  } = data;

  const reduce = useReducedMotion();

  const [storedIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;
  const index = total === 0 ? 0 : Math.min(storedIndex, total - 1);

  const current = testimonials[index];

  const autoplay =
    slider.autoplay &&
    !reduce &&
    total > 1;

  const interval = Math.max(slider.interval || 8000, 6000);

  const goNext = () => {
    setDirection(1);
    setIndex((previous) => (previous + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((previous) => (previous - 1 + total) % total);
  };

  const goTo = (nextIndex: number) => {
    if (nextIndex === index) return;

    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  if (!current) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#f4f0e8] py-16 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[#141714] sm:py-16 lg:py-16"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[450px] w-[450px] rounded-full bg-[#2a5c43]/[0.05] blur-[130px]"
      />

      <MainContainer>
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">
          {/* Left: Heading and navigation */}
          <motion.div
            variants={headingContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="flex flex-col justify-between gap-10"
          >
            <div>
              {eyebrow && (
                <motion.div variants={rise} className="mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </motion.div>
              )}

              <motion.div variants={rise}>
                <SectionTitle
                  titleStart={titleStart}
                  titleAccent={titleAccent}
                  titleEnd={titleEnd}
                  tone="light"
                />
              </motion.div>
            </div>

            {/* Navigation controls */}
            {total > 1 && (
              <motion.div
                variants={rise}
                className="flex items-center gap-5"
              >
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={slider.previousLabel}
                    className="grid h-11 w-11 place-items-center border border-[#141714]/20 bg-white text-[#141714] shadow-xs transition-all duration-300 hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                  >
                    <ArrowLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={slider.nextLabel}
                    className="grid h-11 w-11 place-items-center border border-[#141714]/20 bg-white text-[#141714] shadow-xs transition-all duration-300 hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>

                <p
                  className="font-mono text-xs font-semibold tracking-widest text-[#727a72]"
                  aria-hidden="true"
                >
                  <span className="text-[#e0503a]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  {String(total).padStart(2, "0")}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Testimonial content */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null
                )
              ) {
                setPaused(false);
              }
            }}
            className="relative min-w-0 rounded-xs border border-[#e5dfd5] bg-white p-8 shadow-[0_4px_24px_-4px_rgba(20,24,20,0.06)] sm:p-10 lg:p-12"
          >
            {/* Quote icon */}
            <Quote
              aria-hidden="true"
              className="mb-6 h-10 w-10 fill-[#e0503a] text-[#e0503a]"
              strokeWidth={1}
            />

            {/* Animated quote */}
            <div
              className="relative min-h-[220px] sm:min-h-[200px]"
              aria-live="polite"
              aria-atomic="true"
              aria-roledescription="testimonial"
            >
              <AnimatePresence
                mode="wait"
                custom={direction}
                initial={false}
              >
                <motion.figure
                  key={current.id || index}
                  custom={direction}
                  variants={slide}
                  initial={reduce ? false : "enter"}
                  animate="center"
                  exit={reduce ? undefined : "exit"}
                  className="m-0 flex h-full flex-col justify-between"
                >
                  {/* Quote text */}
                  <blockquote className="m-0">
                    <p className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(20px,2.8vw,32px)] font-medium leading-[1.3] tracking-[-0.015em] text-[#141714]">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-[#ede7dc] pt-6">
                    <Avatar
                      key={current.id || index}
                      person={current}
                      fallbackLabel={slider.imageFallbackLabel}
                    />

                    <div className="min-w-0">
                      <p className="text-base font-bold text-[#141714]">
                        {current.name}
                      </p>

                      {current.role && (
                        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-[#737a73]">
                          {current.role}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {total > 1 && (
              <div
                className="mt-8 flex items-center gap-2"
                role="group"
                aria-label={slider.paginationLabel}
              >
                {testimonials.map((item, i) => {
                  const active = index === i;
                  const past = i < index;

                  return (
                    <button
                      key={item.id || i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${slider.slideLabel} ${item.name}`}
                      aria-current={active ? "step" : undefined}
                      className="group relative flex h-6 flex-1 items-center outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a]"
                    >
                      <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-[#ede7dc] transition-all duration-300 group-hover:h-[4px]">
                        <span
                          key={`${item.id || i}-${active ? index : "inactive"}`}
                          onAnimationEnd={() => {
                            if (active && autoplay && !paused) {
                              goNext();
                            }
                          }}
                          className="block h-full origin-left rounded-full bg-[#e0503a]"
                          style={{
                            transform:
                              past || (active && !autoplay)
                                ? "scaleX(1)"
                                : "scaleX(0)",

                            animation:
                              active && autoplay
                                ? `testimonial-progress ${interval}ms linear forwards`
                                : undefined,

                            animationPlayState: paused
                              ? "paused"
                              : "running",
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
      </MainContainer>

      {/* Slider progress animation */}
      <style jsx global>{`
        @keyframes testimonial-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
