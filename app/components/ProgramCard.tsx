"use client"

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const themes = {
  coral: { card: "bg-[#e0503a] border-[#e0503a]", title: "text-[#14110c]", desc: "text-[#14110c]/70", link: "text-[#14110c]", shadow: "hover:shadow-[0_28px_50px_-24px_rgba(224,80,58,0.7)]", fallback: "bg-[linear-gradient(160deg,#ef6e58,#9c2f1f)]" },
  green: { card: "bg-[#3b7a68] border-[#3b7a68]", title: "text-[#f1ece1]", desc: "text-[#f1ece1]/75", link: "text-[#f1ece1]", shadow: "hover:shadow-[0_28px_50px_-24px_rgba(59,122,104,0.8)]", fallback: "bg-[linear-gradient(160deg,#4f9a84,#1c3a31)]" },
  sand:  { card: "bg-[#e2c392] border-[#e2c392]", title: "text-[#14110c]", desc: "text-[#14110c]/70", link: "text-[#14110c]", shadow: "hover:shadow-[0_28px_50px_-24px_rgba(226,195,146,0.7)]", fallback: "bg-[linear-gradient(160deg,#f0d8b0,#a8864f)]" },
};


/* These names match the parent grid, so the grid's stagger drives each card */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/* Image frame opens from the bottom, picture settles inside it */
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.15 } },
};
const pictureVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.6, ease, delay: 0.15 } },
};

type ProgramCardProps = {
  program: {
    image: string;
    imageAlt?: string;
    theme: string;
    title: string;
    description: string;
  };
};

export function ProgramCard({ program }: ProgramCardProps) {
  const [imgFailed, setImgFailed] = useState(!program.image);
  const t = themes[program.theme as keyof typeof themes] || themes.coral;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group flex flex-col overflow-hidden border transition-shadow duration-500 ${t.card} ${t.shadow}`}
    >
      {/* Program image */}
      <motion.div variants={frameVariants} className="relative aspect-[3/2] overflow-hidden bg-[#161a17]">
        <motion.div variants={pictureVariants} className="absolute inset-0">
          {!imgFailed ? (
            <Image
              src={program.image}
              alt={program.imageAlt || ""}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              onError={() => setImgFailed(true)}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]
                         motion-reduce:transition-none"
            />
          ) : (
            <div className={`h-full w-full ${t.fallback}`} aria-hidden="true" />
          )}
        </motion.div>
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      <div className="flex flex-1 flex-col px-8 pb-12 pt-9">
        <h3 className={`font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[34px] font-medium leading-[1.1] ${t.title}`}>
          {program.title}
        </h3>
        <p className={`mt-4 max-w-sm text-[15px] leading-relaxed ${t.desc}`}>{program.description}</p>

      </div>
    </motion.article>
  );
}