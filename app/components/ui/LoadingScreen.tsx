"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "wkx-loading-seen";
const MIN_DURATION = 1800; // ms the count takes at minimum
const MIN_DURATION_REDUCED = 600;
const MAX_WAIT = 3000; // never hold the screen longer than this (ms)

type LoadingScreenProps = {
  siteName?: string;
  tagline?: string;
  /** Show only once per browser tab session */
  oncePerSession?: boolean;
};

export default function LoadingScreen({
  siteName = "WKX Foundation",
  tagline = "Pick a cause. Watch it grow.",
  oncePerSession = true,
}: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const pageLoaded = useRef(false);

  useEffect(() => {
    if (oncePerSession) {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
          setVisible(false);
          return;
        }
      } catch {
        // storage blocked: just show the screen
      }
    }

    const duration = reduceMotion ? MIN_DURATION_REDUCED : MIN_DURATION;
    const start = performance.now();
    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout>;

    pageLoaded.current = document.readyState === "complete";
    const onLoad = () => {
      pageLoaded.current = true;
    };
    window.addEventListener("load", onLoad);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 100 * (1 - Math.pow(1 - t, 3));
      // Hold at 90% until the page has loaded, but give up after MAX_WAIT
      const timedOut = now - start > MAX_WAIT;
      const cap = pageLoaded.current || timedOut ? 100 : 90;
      const next = Math.round(Math.min(eased, cap));

      setProgress((p) => Math.max(p, next));

      if (next >= 100) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore
        }
        hideTimer = setTimeout(() => setVisible(false), 350);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [oncePerSession, reduceMotion]);

  // Restore scrolling as soon as the screen starts leaving
  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={false}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
          }
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0A0B09] px-5 py-6 text-[#EAE3D6] sm:px-8 sm:py-8 lg:px-16"
        >
          <span className="sr-only">Loading {siteName}</span>

          {/* Top row */}
          <div className="flex items-start justify-between gap-6">
            <p className="font-serif text-lg sm:text-xl">{siteName}</p>
            <p className="max-w-[16rem] text-right text-xs leading-5 text-[#B9B5AC]">
              {tagline}
            </p>
          </div>

          {/* Counter */}
          <div aria-hidden="true" className="flex items-end justify-between gap-6">
            <p className="font-serif text-[28vw] leading-[0.8] tabular-nums sm:text-[22vw] lg:text-[18vw]">
              {String(progress).padStart(2, "0")}
              <span className="text-[#EE503B]">%</span>
            </p>
          </div>

          {/* Progress line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 bg-white/10"
          >
            <div
              className="h-full origin-left bg-[#EE503B]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}