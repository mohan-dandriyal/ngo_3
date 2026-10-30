"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { breadcrumb } from "@/app/types/breadcrumb";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

function BreadCrumb({ breadcrumb, className }: breadcrumb) {
  return (
    <motion.nav
      variants={fade}
      aria-label="Breadcrumb"
      className={className || "mb-4 sm:mb-5"}
    >
      <ol className="flex flex-wrap items-center gap-2 text-[13px]">
        {breadcrumb.map((item, index) => {
          const last = index === breadcrumb.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {last || !item.linkTo ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className="font-medium text-[#f0eadf]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.linkTo}
                  className="text-[#d6d9c9]/80 outline-none transition-colors hover:text-[#e0503a] focus-visible:text-[#e0503a]"
                >
                  {item.label}
                </Link>
              )}

              {!last && (
                <svg
                  viewBox="0 0 8 12"
                  fill="none"
                  stroke="#a8c686"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-2.5 w-2 opacity-70"
                >
                  <path d="M1.5 1.5L6 6l-4.5 4.5" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}

export default BreadCrumb;
