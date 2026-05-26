"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type RsvpValues = {
  fullName: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  plusOne: "yes" | "no";
  message: string;
};

const baseFieldClass =
  "w-full rounded-xl border border-[var(--color-soft-gold)]/35 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-burgundy)] focus:ring-2 focus:ring-[var(--color-burgundy)]/25";

export function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpValues>({
    defaultValues: {
      attending: "yes",
      plusOne: "no",
    },
  });

  const onSubmit = async (values: RsvpValues) => {
    setSubmitError("");

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      throw new Error(data.message || "Unable to submit RSVP");
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3200);
  };

  return (
    <section
      id="rsvp"
      className="bg-[var(--color-muted-beige)]/35 py-24 md:py-32"
    >
      <div className="section-shell space-y-10">
        <SectionHeading
          centered
          eyebrow="RSVP"
          title="Will You Celebrate With Us?"
          description="Please confirm your attendance details. We cannot wait to host you."
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-3xl rounded-3xl border border-[var(--color-soft-gold)]/25 bg-white/70 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur md:p-8"
        >
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(async (values) => {
              try {
                await onSubmit(values);
              } catch (error) {
                setSubmitError(
                  error instanceof Error
                    ? error.message
                    : "Unable to submit RSVP",
                );
              }
            })}
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm">Full Name</span>
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className={baseFieldClass}
                  placeholder="Adaeze Okonkwo"
                />
                {errors.fullName ? (
                  <p className="text-xs text-[var(--color-burgundy)]">
                    {errors.fullName.message}
                  </p>
                ) : null}
              </label>

              <label className="space-y-2">
                <span className="text-sm">Email</span>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={baseFieldClass}
                  placeholder="guest@email.com"
                />
                {errors.email ? (
                  <p className="text-xs text-[var(--color-burgundy)]">
                    {errors.email.message}
                  </p>
                ) : null}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm">Phone Number</span>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className={baseFieldClass}
                  placeholder="+234 801 234 5678"
                />
                {errors.phone ? (
                  <p className="text-xs text-[var(--color-burgundy)]">
                    {errors.phone.message}
                  </p>
                ) : null}
              </label>

              <label className="space-y-2">
                <span className="text-sm">Will you attend?</span>
                <select {...register("attending")} className={baseFieldClass}>
                  <option value="yes">Yes, joyfully attending</option>
                  <option value="no">Sorry, I cannot attend</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm">Bringing a plus one?</span>
                <select {...register("plusOne")} className={baseFieldClass}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm">Message for the couple</span>
              <textarea
                {...register("message")}
                className={`${baseFieldClass} min-h-28 resize-y`}
                placeholder="Share your blessings and warm wishes"
              />
            </label>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle size={14} className="animate-spin" /> Sending
                  </span>
                ) : (
                  "Submit RSVP"
                )}
              </Button>

              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-green)]"
                >
                  <CheckCircle2 size={16} className="text-emerald-600" /> RSVP
                  received successfully
                </motion.p>
              ) : null}

              {submitError ? (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-burgundy)]"
                >
                  {submitError}
                </motion.p>
              ) : null}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
