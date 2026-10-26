
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import type { TeamSection as TeamSectionType, TeamMember } from "@/app/types/team";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

interface TeamSectionProps {
  data: TeamSectionType;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow, SectionTitle and Description join the stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

/* Small brand icons, drawn inline so no extra icon package is needed */
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M4.5 9h3v11h-3V9zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4zM10 9h2.9v1.5c.5-.9 1.7-1.8 3.4-1.8 3.3 0 3.7 2.2 3.7 4.9V20h-3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20h-3V9z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[17px] w-[17px]">
      <path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.7L17.5 3zm-1.1 16h1.8L6.7 4.9H4.8L16.4 19z" />
    </svg>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center border border-[#ece6da]/40 text-[#ece6da] outline-none transition-colors
                 duration-300 hover:border-[#e0503a] hover:bg-[#e0503a] hover:text-[#14110c]
                 focus-visible:ring-2 focus-visible:ring-[#e8c99a]"
    >
      {children}
    </a>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(!member.image);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hasSocials = member.linkedin || member.twitter || member.email;

  return (
    <motion.article
      layout
      variants={fadeUp}
      exit="exit"
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#161a17]">
        {!failed && member.image ? (
          <Image
            src={member.image}
            alt={member.imageAlt || member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            onError={() => setFailed(true)}
            className="object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.05]
                       group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:transition-none"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[linear-gradient(160deg,#27382e,#0a0a09)]">
            <span className="font-['Cormorant_Garamond',Georgia,serif] text-6xl font-semibold text-[#e8c99a]">
              {initials}
            </span>
          </div>
        )}

        {/* Bio and social links slide up on hover or keyboard focus (large screens) */}
        {(member.bio || hasSocials) && (
          <div
            className="absolute inset-0 hidden translate-y-full flex-col justify-end gap-5 bg-gradient-to-t from-[#0a0a09] via-[#0a0a09]/85
                       to-transparent p-6 transition-transform duration-500 ease-out group-hover:translate-y-0
                       group-focus-within:translate-y-0 lg:flex motion-reduce:transition-none"
          >
            {member.bio && <p className="text-[15px] leading-relaxed text-[#ece6da]">{member.bio}</p>}
            {hasSocials && (
              <div className="flex gap-2.5">
                {member.linkedin && (
                  <SocialLink href={member.linkedin} label={`${member.name} on LinkedIn`}>
                    <LinkedinIcon />
                  </SocialLink>
                )}
                {member.twitter && (
                  <SocialLink href={member.twitter} label={`${member.name} on X`}>
                    <XIcon />
                  </SocialLink>
                )}
                {member.email && (
                  <SocialLink href={`mailto:${member.email}`} label={`Email ${member.name}`}>
                    <Mail size={17} aria-hidden="true" />
                  </SocialLink>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[28px] font-medium leading-tight text-[#14110c]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#3f6b57]">{member.role}</p>

        {/* Touch screens have no hover, so the bio and links show here instead */}
        {member.bio && <p className="mt-3 text-[15px] leading-relaxed text-[#5a544c] lg:hidden">{member.bio}</p>}
        {hasSocials && (
          <div className="mt-4 flex gap-2.5 text-[#14110c] lg:hidden">
            {member.linkedin && (
              <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`} target="_blank" rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center border border-[#14110c]/25">
                <LinkedinIcon />
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} aria-label={`${member.name} on X`} target="_blank" rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center border border-[#14110c]/25">
                <XIcon />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}
                className="grid h-10 w-10 place-items-center border border-[#14110c]/25">
                <Mail size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function TeamSection({ data }: TeamSectionProps) {
  const { eyebrow, titleStart, titleAccent, description, allLabel, members = [], cta } =
    data ?? ({} as TeamSectionType);

  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("all");

  // Filter chips come from the departments found in your data
  const departments = useMemo(
    () => Array.from(new Set(members.map((m) => m.department).filter(Boolean))) as string[],
    [members]
  );

  const visible = active === "all" ? members : members.filter((m) => m.department === active);

  return (
    <section
      id="team"
      className="w-full overflow-hidden bg-[#e8e1d5] text-[#14110c] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="py-20 lg:py-[130px]">
          {/* Heading */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-20"
          >
            <div>
              {eyebrow && <Eyebrow eyebrow={eyebrow} tone="light" />}
              <SectionTitle titleStart={titleStart} titleAccent={titleAccent} tone="light" />
            </div>
            {description && (
              <div className="lg:pb-3">
                <Description description={description} variant="body" tone="light" />
              </div>
            )}
          </motion.div>

          {/* Department filter */}
          {departments.length > 1 && (
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true }}
              role="group"
              aria-label="Filter team by department"
              className="mt-12 flex flex-wrap gap-2.5"
            >
              {["all", ...departments].map((d) => {
                const isActive = active === d;
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(d)}
                    className={`relative px-5 py-2.5 text-sm font-medium outline-none transition-colors duration-300
                                focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8e1d5]
                                ${isActive ? "text-[#f1ece1]" : "border border-[#14110c]/20 text-[#14110c] hover:border-[#14110c]"}`}
                  >
                    {/* One dark pill slides between the chips */}
                    {isActive && (
                      <motion.span
                        layoutId="team-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#14110c]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{d === "all" ? allLabel || "All" : d}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Members */}
          {members.length > 0 && (
            <motion.div
              layout
              variants={container}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((m) => (
                  <MemberCard key={m.name} member={m} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Join us */}
          {cta?.linkText && (
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-20 flex flex-col gap-5 border-t border-[#14110c]/20 pt-10 sm:flex-row sm:items-center sm:justify-between"
            >
              {cta.text && (
                <p className="max-w-xl font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(26px,2.8vw,38px)] font-medium italic leading-tight">
                  {cta.text}
                </p>
              )}
              <Link
                href={cta.linkTo || "#"}
                className="group relative inline-flex items-center gap-3 self-start pb-2 text-sm tracking-[0.02em] text-[#14110c]
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0503a]"
              >
                {cta.linkText}
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full bg-[#e0503a] transition-[height] duration-300 group-hover:h-[3px]"
                />
              </Link>
            </motion.div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}