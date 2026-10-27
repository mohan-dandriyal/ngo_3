"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ContactSection as ContactSectionType, ContactMethod } from "@/app/types/contact";
import MainContainer from "../ui/MainContainer";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionContent";

interface ContactSectionProps {
  data: ContactSectionType;
  /** Send the form values to your API here. Throw to show the error message. */
  onSubmit?: (values: Record<string, string>) => Promise<void>;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/* Names are "hidden" and "show" so Eyebrow, SectionTitle and Description join the stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/* The "icon" value in your JSON picks one of these */
const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  phone: Phone,
  "map-pin": MapPin,
};

function MethodCard({ method }: { method: ContactMethod }) {
  const Icon = ICONS[method.icon] ?? Mail;
  const plainLink = /^(mailto:|tel:|https?:)/.test(method.link);

  const className = `group relative block overflow-hidden border border-[#ffff]/15 outline-none
    focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e8e1d5]`;

  const body = (
    <>
      {/* Dark fill sweeps across on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-[#403f3f] transition-transform duration-500 ease-out
                   group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
      <span className="relative grid grid-cols-[52px_1fr_auto] items-start gap-5 p-6 sm:p-7">
        <span
          className="grid h-[52px] w-[52px] place-items-center rounded-full border border-[#ffff]/25 text-[#e0503a]
                     transition-colors duration-300 group-hover:border-[#e8c99a]/50 group-hover:text-[#e8c99a]"
        >
          <Icon size={22} aria-hidden="true" />
        </span>

        <span className="block">
          <span className="block font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[28px] font-medium leading-tight text-[#b6b5b5] transition-colors duration-300 group-hover:text-[#f1ece1]">
            {method.title}
          </span>
          <span className="mt-1.5 block text-[15px] leading-relaxed text-[#9b9a97] transition-colors duration-300 group-hover:text-[#bdb7aa]">
            {method.description}
          </span>
          <span className="mt-4 block text-[15px] font-semibold text-[#a2a2a2] transition-colors duration-300 group-hover:text-[#e0503a]">
            {method.value}
          </span>
        </span>

        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="mt-1 text-[#878787] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e0503a]"
        />
      </span>
    </>
  );

  return plainLink ? (
    <a href={method.link} className={className}>
      {body}
    </a>
  ) : (
    <Link href={method.link} className={className}>
      {body}
    </Link>
  );
}

export default function ContactSection({ data, onSubmit }: ContactSectionProps) {
  const { eyebrow, titleStart, titleAccent, description, contactMethods = [], form } =
    data ?? ({} as ContactSectionType);

  const reduce = useReducedMotion();
  const fields = form?.fields ?? [];

  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const setValue = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or fill this field, bots often do
    if (formData.get("company")) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // No handler passed in yet: wait briefly so the sending state is visible.
        // Replace with a fetch("/api/contact", { method: "POST", ... }) call.
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus("success");
      setValues({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full overflow-hidden bg-[#0a0a09] text-[#fff] font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]"
    >
      <MainContainer>
        <div className="grid items-start gap-14 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-[130px]">
          {/* Heading and contact methods */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {eyebrow && <Eyebrow eyebrow={eyebrow}  />}
            <SectionTitle titleStart={titleStart} titleAccent={titleAccent}  />

            {description && (
              <div className="mt-7">
                <Description description={description} variant="body"  />
              </div>
            )}

            {contactMethods.length > 0 && (
              <ul className="mt-12 space-y-4">
                {contactMethods.map((m) => (
                  <motion.li key={m.id} variants={fadeUp}>
                    <MethodCard method={m} />
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Form */}
          {form && (
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              className="bg-[#14110c] p-8 text-[#ece6da] sm:p-10 lg:sticky lg:top-24 lg:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    role="status"
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    {/* Check mark draws itself */}
                    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-16 w-16 text-[#e0503a]">
                      <motion.circle
                        cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M19 33l9 9 17-19" stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                      />
                    </svg>
                    <p className="mt-8 max-w-[22ch] font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(30px,3vw,42px)] font-medium leading-[1.15]">
                      {form.successMessage}
                    </p>
                    {form.resetText && (
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-8 border-b border-[#e0503a] pb-1.5 text-sm text-[#ece6da] outline-none transition-colors
                                   hover:text-[#e0503a] focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#14110c]"
                      >
                        {form.resetText}
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    aria-busy={status === "sending"}
                  >
                    {form.eyebrow && (
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e9a26b]">{form.eyebrow}</p>
                    )}
                    {form.title && (
                      <h3 className="font-['Cormorant_Garamond','EB_Garamond',Georgia,serif] text-[clamp(34px,3.6vw,52px)] font-medium leading-none tracking-[-0.01em]">
                        {form.title}
                      </h3>
                    )}

                    <div className="mt-10 space-y-8">
                      {fields.map((f) => {
                        const id = `contact-${f.name}`;
                        const common = {
                          id,
                          name: f.name,
                          required: f.required,
                          placeholder: f.placeholder,
                          value: values[f.name] ?? "",
                          disabled: status === "sending",
                          "aria-required": f.required || undefined,
                          className:
                            "w-full bg-transparent py-3 text-base text-[#f1ece1] outline-none placeholder:text-[#8f8a80] disabled:opacity-60",
                        };

                        return (
                          <div key={f.name} className="group/field relative">
                            <label htmlFor={id} className="block text-sm text-[#bdb7aa]">
                              {f.label}
                              {f.required && (
                                <span aria-hidden="true" className="ml-1 text-[#e0503a]">
                                  *
                                </span>
                              )}
                            </label>

                            {f.type === "textarea" ? (
                              <textarea
                                {...common}
                                rows={5}
                                onChange={(e) => setValue(f.name, e.target.value)}
                                className={`${common.className} resize-none`}
                              />
                            ) : (
                              <input
                                {...common}
                                type={f.type || "text"}
                                onChange={(e) => setValue(f.name, e.target.value)}
                              />
                            )}

                            {/* Base line, with a red line that draws in on focus */}
                            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#ece6da]/25" />
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#e0503a] transition-transform
                                         duration-500 ease-out group-focus-within/field:scale-x-100"
                            />
                          </div>
                        );
                      })}

                      {/* Honeypot field for spam bots; hidden from people and screen readers */}
                      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                        <label>
                          Company
                          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>
                    </div>

                    {status === "error" && (
                      <p role="alert" className="mt-6 text-sm text-[#ef6e58]">
                        {form.errorMessage || "Something went wrong. Please try again."}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative mt-10 inline-flex items-center gap-4 overflow-hidden bg-[#e0503a] px-7 py-[18px]
                                 text-[15px] font-semibold tracking-[0.01em] text-[#14110c] outline-none transition-shadow duration-300
                                 hover:shadow-[0_10px_34px_-8px_rgba(224,80,58,0.7)] disabled:cursor-wait disabled:opacity-80
                                 focus-visible:ring-2 focus-visible:ring-[#e8c99a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#14110c]"
                    >
                      {/* Lighter fill sweeps across on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -translate-x-full bg-[#ef6e58] transition-transform duration-500 ease-out
                                   group-hover:translate-x-0 motion-reduce:transition-none"
                      />
                      <span className="relative">{form.submitText}</span>
                      <motion.span
                        className="relative"
                        animate={status === "sending" && !reduce ? { x: [0, 6, 0], opacity: [1, 0.4, 1] } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.9, repeat: status === "sending" ? Infinity : 0 }}
                      >
                        <Send size={17} aria-hidden="true" />
                      </motion.span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}