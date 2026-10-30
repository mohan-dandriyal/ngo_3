
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
  ArrowDownRight,
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
  Description,
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
};

function ContactCard({ method }: { method: ContactMethod }) {
  const Icon = ICONS[method.icon] ?? Mail;
  const plainLink = /^(mailto:|tel:|https?:)/.test(method.link);

  const content = (
    <div className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#a8c686]/40 hover:bg-white/[0.07] sm:p-6">
      <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-[#a8c686] transition-transform duration-500 group-hover:scale-y-100" />

      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#a8c686]/10 text-[#a8c686] transition-all duration-500 group-hover:bg-[#a8c686] group-hover:text-[#0a0a09]">
        <Icon size={21} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-[27px] leading-tight text-[#ece6da]">
          {method.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#a7a398]">
          {method.description}
        </p>

        <p className="mt-4 break-words text-sm font-semibold text-[#e0503a]">
          {method.value}
        </p>
      </div>

      <ArrowUpRight
        size={19}
        className="mt-1 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a8c686]"
        aria-hidden="true"
      />
    </div>
  );

  return plainLink ? (
    <a
      href={method.link}
      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#a8c686]"
    >
      {content}
    </a>
  ) : (
    <Link
      href={method.link}
      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#a8c686]"
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
        throw new Error("Contact form handler is not configured.");
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
      className="relative isolate overflow-hidden bg-[#0a0a09] py-16 text-[#ece6da] sm:py-18 lg:py-20"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#a8c686]/[0.07] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#e0503a]/[0.06] blur-[120px]"
      />

      <MainContainer>
       

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Contact methods */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8c686]">
                Get in touch
              </span>

              <h3 className="mt-3 font-['Cormorant_Garamond',Georgia,serif] text-4xl leading-tight text-[#ece6da] sm:text-5xl">
                Let&apos;s make
                <br />
                <span className="italic text-[#e0503a]">
                  something meaningful.
                </span>
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#a7a398]">
                Every meaningful change begins with a conversation. Reach out
                and let&apos;s explore how we can make a difference together.
              </p>
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
              className="mt-8 flex items-center gap-3 border-t border-white/10 pt-7"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e0503a]/10 text-[#e0503a]">
                <HeartHandshake size={19} />
              </div>

              <p className="text-sm text-[#a7a398]">
                Have an idea for change?{" "}
                <span className="text-[#ece6da]">
                  We&apos;d love to hear it.
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          {form && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.8, ease }}
              className="relative overflow-hidden rounded-3xl bg-[#ece6da] p-6 text-[#171713] sm:p-9 lg:p-11"
            >
              {/* Form decoration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#252d4a]/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#252d4a]/10"
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
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-[#a8c686]/25 text-[#526b3c]">
                      <Check size={32} />
                    </div>

                    <p className="mt-8 max-w-sm font-['Cormorant_Garamond',Georgia,serif] text-5xl leading-tight">
                      {form.successMessage}
                    </p>

                    {form.resetText && (
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-8 inline-flex items-center gap-3 border-b border-[#e0503a] pb-2 text-sm font-semibold transition-colors hover:text-[#e0503a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0503a]"
                      >
                        {form.resetText}
                        <ArrowUpRight size={16} />
                      </button>
                    )}
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
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#a34b37]">
                          {form.eyebrow}
                        </p>
                      )}

                      <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl leading-tight sm:text-5xl">
                        {form.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[#6d6a60]">
                        Tell us a little about what brings you here.
                      </p>
                    </div>

                    <div className="space-y-7">
                      {fields.map((field) => {
                        const id = `contact-${field.name}`;

                        const inputClass =
                          "mt-2 w-full border-b border-[#252d4a]/20 bg-transparent px-0 py-3 text-[15px] text-[#171713] outline-none transition-colors placeholder:text-[#969187] focus:border-[#e0503a] disabled:opacity-50";

                        return (
                          <div key={field.name}>
                            <label
                              htmlFor={id}
                              className="text-sm font-semibold text-[#45443e]"
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
                      <p role="alert" className="mt-5 text-sm text-[#c33e2d]">
                        {form.errorMessage ||
                          "Something went wrong. Please try again."}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative mt-9 inline-flex w-full items-center justify-between overflow-hidden rounded-full bg-[#e0503a] px-7 py-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#c94230] hover:shadow-lg hover:shadow-[#e0503a]/20 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171713] focus-visible:ring-offset-2"
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
