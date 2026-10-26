"use client"

import React, { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Wrap Next's Link once, outside the component, so it isn't recreated on every render
const MotionLink = motion.create(Link);

type PrimaryButtonProps = {
    children: ReactNode;
    href?: string;
    className?: string;
};

function PrimaryButton({ children, href = "#", className = "" }: PrimaryButtonProps) {
    return (
        <MotionLink
            href={href}
            whileTap={{ scale: 0.97 }}
            className={`group relative inline-flex items-center gap-5 overflow-hidden bg-[#e0503a] px-6 py-[18px]
                        text-[15px] font-medium tracking-[0.01em] text-[#14110c]
                        shadow-[0_0_0_0_rgba(224,80,58,0)] transition-shadow duration-300
                        hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.7)]
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]
                        ${className}`}
        >
            {/* Lighter fill sweeps across on hover */}
            <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[#ef6e58] transition-transform duration-500
                           ease-out group-hover:translate-x-0 motion-reduce:transition-none"
            />
            <span className="relative">{children}</span>
            <svg
                viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"
                className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
                <path d="M3 11L11 3M4.5 3H11v6.5" />
            </svg>
        </MotionLink>
    );
}

export default PrimaryButton;