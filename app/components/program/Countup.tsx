"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* A number that counts up the first time it is visible */
export default function CountUp({ value, plain = false }: { value: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.2, 0.8, 0.15, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const rounded = Math.round(display);
  return <span ref={ref}>{plain ? String(rounded) : new Intl.NumberFormat("en-IN").format(rounded)}</span>;
}