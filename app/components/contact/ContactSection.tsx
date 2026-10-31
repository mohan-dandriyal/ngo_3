"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Send,
  Check,
  type LucideIcon,
} from "lucide-react";

import type {
  ContactSection as ContactSectionType,
  ContactMethod,
} from "@/app/types/contact";

import MainContainer from "../ui/MainContainer";
import {
  Eyebrow,
  SectionTitle,
} from "../ui/SectionContent";

interface ContactSectionProps {
  data: ContactSectionType;
  onSubmit?: (values: Record<string, string>) => Promise<void>;
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  phone: Phone,
  "map-pin": MapPin,
  address: MapPin,
  Address: MapPin,
};

function ContactCard({ method }: { method: ContactMethod }) {
  const Icon = ICONS[method.icon] ?? Mail;
  const plainLink = /^(mailto:|tel:|https?:)/.test(method.link);

  const content = (
    <div className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-[#ede7dc] bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#e0503a]/40 hover:shadow-md sm:p-6">
      <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-[#e0503a] transition-transform duration-300 group-hover:scale-y-100" />

      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e0503a]/10 text-[#e0503a] transition-all duration-300 group-hover:bg-[#e0503a] group-hover:text-white">
        <Icon size={21} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-[26px] font-bold leading-tight text-[#141714]">
          {method.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#555d55]">
          {method.description}
        </p>

        <p className="mt-4 break-words text-sm font-semibold text-[#e0503a]">
          {method.value}
        </p>
      </div>

      <ArrowUpRight
        size={19}
        className="mt-1 shrink-0 text-[#737a73] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e0503a]"
        aria-hidden="true"
      />
    </div>
  );

  return plainLink ? (
    <a
      href={method.link}
      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a]"
    >
      {content}
    </a>
  ) : (
    <Link
      href={method.link}
      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a]"
    >
      {content}
    </Link>
  );
}

export default function ContactSection({
  data,
  onSubmit,
}: ContactSectionProps) {
  const {
    eyebrow,
    titleStart,
    titleAccent,
    description,
    contactMethods = [],
    form,
  } = data;

  const reduce = useReducedMotion();

  const fields = form?.fields ?? [];

  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const setValue = (name: string, value: string) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Honeypot spam protection
    if (formData.get("company")) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Fallback simulation for client demo
        await new Promise((resolve) => setTimeout(resolve, 800));
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
      className="relative isolate overflow-hidden bg-[#faf8f5] py-14 text-[#141714] sm:py-16"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#e0503a]/[0.05] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#2a5c43]/[0.05] blur-[120px]"
      />

      <MainContainer>
        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Contact methods column */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <div className="mb-8">
              {eyebrow && (
                <div className="mb-4">
                  <Eyebrow eyebrow={eyebrow} tone="light" />
                </div>
              )}

              <SectionTitle
                titleStart={titleStart || "Let's make something"}
                titleAccent={titleAccent || "meaningful happen."}
                tone="light"
              />

              {description && (
                <p className="mt-5 max-w-md text-sm leading-7 text-[#555d55]">
                  {description}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <motion.div key={method.id} variants={fadeUp}>
                  <ContactCard method={method} />
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-3 border-t border-[#ede7dc] pt-7"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e0503a]/10 text-[#e0503a]">
                <HeartHandshake size={19} />
              </div>

              <p className="text-sm text-[#555d55]">
                {data.ideaNote || "Have an idea for change?"}{" "}
                <span className="font-semibold text-[#141714]">
                  {data.ideaHighlight || "We'd love to hear it."}
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form column */}
          {form && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.8, ease }}
              className="relative overflow-hidden rounded-3xl border border-[#ede7dc] bg-white p-6 text-[#141714] shadow-sm sm:p-9 lg:p-11"
            >
              {/* Form decoration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#ede7dc]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#ede7dc]"
              />

              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    role="status"
                    className="relative flex min-h-[480px] flex-col items-start justify-center"
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-[#2a5c43]/15 text-[#2a5c43]">
                      <Check size={32} />
                    </div>

                    <p className="mt-8 max-w-sm font-['Cormorant_Garamond',Georgia,serif] text-4xl font-bold leading-tight text-[#141714] sm:text-5xl">
                      {form.successMessage}
                    </p>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#e0503a] pb-1 text-sm font-semibold text-[#141714] transition-colors hover:text-[#e0503a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a]"
                    >
                      {form.resetText || "Send another message"}
                      <ArrowUpRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    aria-busy={status === "sending"}
                    className="relative"
                  >
                    <div className="mb-9">
                      {form.eyebrow && (
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e0503a]">
                          {form.eyebrow}
                        </p>
                      )}

                      <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-bold leading-tight text-[#141714] sm:text-5xl">
                        {form.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[#555d55]">
                        {form.description || "Tell us a little about what brings you here."}
                      </p>
                    </div>

                    <div className="space-y-7">
                      {fields.map((field) => {
                        const id = `contact-${field.name}`;

                        const inputClass =
                          "mt-2 w-full border-b border-[#ede7dc] bg-transparent px-0 py-3 text-[15px] text-[#141714] outline-none transition-colors placeholder:text-[#969187] focus:border-[#e0503a] disabled:opacity-50";

                        return (
                          <div key={field.name}>
                            <label
                              htmlFor={id}
                              className="text-sm font-semibold text-[#141714]"
                            >
                              {field.label}
                              {field.required && (
                                <span className="ml-1 text-[#e0503a]">
                                  *
                                </span>
                              )}
                            </label>

                            {field.type === "textarea" ? (
                              <textarea
                                id={id}
                                name={field.name}
                                rows={4}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={values[field.name] ?? ""}
                                disabled={status === "sending"}
                                onChange={(e) =>
                                  setValue(field.name, e.target.value)
                                }
                                className={`${inputClass} resize-none`}
                              />
                            ) : (
                              <input
                                id={id}
                                name={field.name}
                                type={field.type || "text"}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={values[field.name] ?? ""}
                                disabled={status === "sending"}
                                onChange={(e) =>
                                  setValue(field.name, e.target.value)
                                }
                                className={inputClass}
                              />
                            )}
                          </div>
                        );
                      })}

                      {/* Honeypot */}
                      <div
                        aria-hidden="true"
                        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                      >
                        <label>
                          Company
                          <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </label>
                      </div>
                    </div>

                    {status === "error" && (
                      <p role="alert" className="mt-5 text-sm text-[#e0503a]">
                        {form.errorMessage ||
                          "Something went wrong. Please try again."}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative mt-9 inline-flex w-full items-center justify-between overflow-hidden rounded-full bg-[#e0503a] px-7 py-5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#c94230] hover:shadow-lg hover:shadow-[#e0503a]/25 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a] focus-visible:ring-offset-2"
                    >
                      <span>
                        {status === "sending"
                          ? "Sending your message..."
                          : form.submitText}
                      </span>

                      <motion.span
                        animate={
                          status === "sending" && !reduce
                            ? { rotate: 360 }
                            : { rotate: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          repeat: status === "sending" ? Infinity : 0,
                          ease: "linear",
                        }}
                      >
                        <Send size={18} />
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
