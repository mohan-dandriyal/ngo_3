

"use client";

import { useState } from "react";
import { Check, Heart, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { DonationFormData } from "@/app/types/donate";

type Props = {
  data: DonationFormData;
};

export default function DonationSection({ data }: Props) {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  const amount = customAmount.trim()
    ? Number(customAmount)
    : selectedAmount ?? 0;

  const validAmount =
    Number.isFinite(amount) && amount >= 1 && amount <= 10000000;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validAmount) return;

    // Demo only: connect a verified payment provider here.
    // Do not collect or transmit real donor information until
    // the backend and payment flow have been implemented.
    setSubmitted(true);
  }

  return (
    <section
      id="donation-form"
      className="scroll-mt-8 bg-[#11120F] px-5 py-20 text-[#EAE3D6] sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#EE503B]">
            <span className="h-px w-8 bg-[#EE503B]" />
            {data.eyebrow}
          </p>

          <h2 className="font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl md:text-6xl">
            {data.titleStart}{" "}
            <span className="italic text-[#EE503B]">
              {data.titleAccent}
            </span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#B9B5AC] md:text-base">
            {data.description}
          </p>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#EE503B]">
                <Heart size={19} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Every contribution matters</h3>
                <p className="mt-2 text-sm leading-6 text-[#B9B5AC]">
                  Choose an amount that works for you. Your support helps
                  community initiatives move forward.
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-start gap-3 text-xs leading-5 text-[#B9B5AC]">
              <ShieldCheck size={18} className="shrink-0 text-[#EE503B]" />
              <span>{data.secureNote}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-white/10 bg-[#0A0B09] p-5 sm:p-8 md:p-10"
        >
          {submitted ? (
            <div
              role="status"
              className="flex min-h-[360px] flex-col items-center justify-center text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EE503B]/10 text-[#EE503B]">
                <Check size={30} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-serif text-3xl">You’re almost there.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#B9B5AC]">
                Your form passed the demo validation. No donation has been
                processed. Connect a payment provider to complete your donation.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 border-b border-[#EE503B] pb-1 text-sm hover:text-[#EE503B]"
              >
                Return to donation form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="mb-6 font-serif text-2xl">{data.donorTitle}</h3>

              <fieldset>
                <legend className="mb-3 text-xs uppercase tracking-[0.16em] text-[#B9B5AC]">
                  Donation frequency
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {data.frequencyOptions.map((option) => {
                    const active = frequency === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setFrequency(option.id as "once" | "monthly")
                        }
                        className={`border px-4 py-3.5 text-sm transition-colors ${
                          active
                            ? "border-[#EE503B] bg-[#EE503B]/10 text-[#EAE3D6]"
                            : "border-white/15 text-[#B9B5AC] hover:border-white/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className="mb-3 text-xs uppercase tracking-[0.16em] text-[#B9B5AC]">
                  Choose your amount
                </legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {data.amounts.map((item) => {
                    const active =
                      selectedAmount === item.value && customAmount === "";

                    return (
                      <button
                        key={item.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSelectedAmount(item.value);
                          setCustomAmount("");
                        }}
                        className={`min-h-[76px] border px-2 py-4 text-center transition-all ${
                          active
                            ? "border-[#EE503B] bg-[#EE503B] text-white"
                            : "border-white/15 text-[#EAE3D6] hover:border-[#EE503B]"
                        }`}
                      >
                        <span className="block text-lg font-medium">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedAmount !== null && customAmount === "" && (
                  <p className="mt-4 text-sm leading-6 text-[#B9B5AC]">
                    {data.amounts.find(
                      (item) => item.value === selectedAmount
                    )?.impact}
                  </p>
                )}

                <label className="mt-6 block text-sm text-[#EAE3D6]">
                  {data.customAmountLabel}
                  <div className="mt-2 flex items-center border border-white/15 focus-within:border-[#EE503B]">
                    <span className="px-4 text-[#B9B5AC]">
                      {data.currencySymbol}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10000000"
                      step="1"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={(event) => {
                        setCustomAmount(event.target.value);
                        setSelectedAmount(null);
                      }}
                      placeholder={data.customAmountPlaceholder}
                      className="min-w-0 flex-1 bg-transparent px-2 py-4 text-sm outline-none placeholder:text-[#77766E]"
                    />
                  </div>
                </label>
              </fieldset>

              <div className="my-8 border-t border-white/10" />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm">
                  {data.nameLabel}
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder={data.namePlaceholder}
                    className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#77766E] focus:border-[#EE503B]"
                  />
                </label>

                <label className="text-sm">
                  {data.emailLabel}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder={data.emailPlaceholder}
                    className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#77766E] focus:border-[#EE503B]"
                  />
                </label>
              </div>

              <label className="mt-5 block text-sm">
                {data.phoneLabel}
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                  placeholder={data.phonePlaceholder}
                  className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#77766E] focus:border-[#EE503B]"
                />
              </label>

              <label className="mt-5 block text-sm">
                {data.messageLabel}
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder={data.messagePlaceholder}
                  className="mt-2 w-full resize-y border border-white/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#77766E] focus:border-[#EE503B]"
                />
              </label>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-[#B9B5AC]">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.target.checked)}
                  className="mt-1 accent-[#EE503B]"
                />
                <span>{data.anonymousLabel}</span>
              </label>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-sm text-[#B9B5AC]">
                    {frequency === "monthly" ? "Monthly total" : "Donation total"}
                  </span>
                  <span className="font-serif text-3xl">
                    {data.currencySymbol}
                    {validAmount ? amount.toLocaleString("en-IN") : "—"}
                    {frequency === "monthly" && validAmount && (
                      <span className="ml-1 text-sm text-[#B9B5AC]">/ mo</span>
                    )}
                  </span>
                </div>

                {!validAmount && (
                  <p className="mb-4 text-sm text-[#EE503B]">
                    Please enter a valid amount between ₹1 and ₹1,00,00,000.
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 bg-[#EE503B] px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#D94330]"
                >
                  <Heart size={17} aria-hidden="true" />
                  {data.submitLabel}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#85847D]">
                  {data.disclaimer}
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
