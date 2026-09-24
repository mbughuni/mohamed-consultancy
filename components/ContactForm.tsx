"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "./Button";
import type { Dictionary } from "@/lib/i18n/dictionary";

const inputClasses =
  "w-full rounded-md border border-navy-100 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-gold-500";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [submitted, setSubmitted] = useState(false);

  // NOTE: This form is currently front-end only. Wire this handler to an
  // API route, email service, or CRM integration when ready — the fields
  // below already capture everything needed for that step.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-navy-100 bg-white p-10 text-center">
        <CheckCircle2 size={36} className="text-gold-500" />
        <h3 className="font-heading font-semibold text-xl text-navy-900">
          {t.thankYouTitle}
        </h3>
        <p className="max-w-sm text-sm text-muted">{t.thankYouBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-xl border border-navy-100 bg-white p-7 sm:grid-cols-2 sm:p-9"
    >
      <div className="sm:col-span-1">
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.fullName}
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.country}
        </label>
        <input
          id="country"
          name="country"
          type="text"
          placeholder={t.countryPlaceholder}
          required
          autoComplete="country-name"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="studyLevel" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.studyLevel}
        </label>
        <select id="studyLevel" name="studyLevel" required className={inputClasses}>
          <option value="">{t.studyLevelSelect}</option>
          {t.studyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="course" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.course}
        </label>
        <input
          id="course"
          name="course"
          type="text"
          placeholder={t.coursePlaceholder}
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-900">
          {t.message}
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" className="w-full sm:w-auto">
          {t.submit}
        </Button>
      </div>
    </form>
  );
}
