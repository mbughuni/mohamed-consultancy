import Image from "next/image";
import { MapPin } from "lucide-react";
import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.hero;

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* Subtle globe/meridian motif, echoing the logo's globe-and-book mark */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] opacity-[0.10] md:-right-24 md:-top-24"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="#C9962B" strokeWidth="1.5" />
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="70"
          stroke="#C9962B"
          strokeWidth="1.5"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="130"
          stroke="#C9962B"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="200"
          x2="380"
          y2="200"
          stroke="#C9962B"
          strokeWidth="1.5"
        />
        <line
          x1="200"
          y1="20"
          x2="200"
          y2="380"
          stroke="#C9962B"
          strokeWidth="1.5"
        />
      </svg>

      <div className="container-brand relative grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <span className="relative block h-14 w-14 overflow-hidden rounded-xl ring-1 ring-white/15">
              <Image
                src="/images/logo.png"
                alt="Mohamed International Education Consultancy logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </span>
            <p className="text-sm font-medium text-gold-200">{t.trustLine}</p>
          </div>

          <h1 className="font-heading font-semibold text-4xl leading-[1.1] sm:text-5xl md:text-[3.25rem]">
            {t.headline}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            {t.sub}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={localeHref(locale, "/application-process")}>
              {t.ctaPrimary}
            </Button>
            <Button href={localeHref(locale, "/universities")} variant="secondary">
              {t.ctaSecondary}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-white/60">
            <MapPin size={16} className="text-gold-300" />
            <span>{t.locationNote}</span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-card-hover md:aspect-[4/5]">
            <Image
              src="/images/students-airport-1.jpg"
              alt="African students travelling together to begin their studies in India"
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-xl border border-navy-100 bg-white p-4 shadow-card sm:block">
            <p className="font-heading font-semibold text-2xl text-navy-900">
              {t.badgeTitle}
            </p>
            <p className="mt-1 text-xs text-muted">{t.badgeSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
